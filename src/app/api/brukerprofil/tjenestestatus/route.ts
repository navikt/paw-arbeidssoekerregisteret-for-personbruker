import { requestTexasOboToken } from '@/lib/texas';
import { logger } from '@navikt/next-logger';
import { stripBearer } from '@navikt/oasis/dist/strip-bearer';
import { headers } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { TjenestestatusRequest } from '@/model/brukerprofil';

const brukerMock = process.env.ENABLE_MOCK === 'enabled';
const BRUKERPROFIL_CLIENT_ID = `${process.env.NAIS_CLUSTER_NAME}:paw:paw-arbeidssoekerregisteret-api-mine-stillinger`;
const TJENESTESTATUS_API_URL = `${process.env.BRUKERPROFIL_API_URL}/api/v1/brukerprofil/tjenestestatus`;

/**
 * Manuell sjekk av type for TjenestestatusRequest.
 * Siden vi ikke kan stole på at request body er av riktig type.
 *
 * @param body - Request body å validere
 * @returns True dersom body inneholder gyldig tjenestestatus
 */
export function gyldigTjenestestatus(body: any): body is TjenestestatusRequest {
    return (
        typeof body === 'object' &&
        body !== null &&
        typeof body.tjenestestatus === 'string' &&
        body.tjenestestatus.trim().length > 0
    );
}

/**
 * PUT endepunktet for `tjenestestatus` i brukerprofil API.
 * Må sende med en status (`tjenstestatus`) for at den skal fungere.
 * 
 * @eksempel
 * Request body:
 * ```tsx
 * fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/brukerprofil/tjenestestatus`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'application/json',
    },
    body: JSON.stringify({ tjenestestatus: 'AKTIV' }),
})
 * ```
 */

export const PUT = async (request: Request) => {
    if (brukerMock) {
        return new Response(null, { status: 204 });
    }

    const traceId = uuidv4();

    try {
        const reqHeaders = await headers();
        const idPortenToken = stripBearer(reqHeaders.get('authorization')!);
        const tokenXToken = await requestTexasOboToken(idPortenToken, BRUKERPROFIL_CLIENT_ID);

        if (!tokenXToken.ok) {
            return new Response(null, { status: 401 });
        }

        let body: any;
        try {
            body = await request.json();
        } catch {
            logger.error({ x_trace_id: traceId }, 'Ugyldig JSON i request body');
            return new Response(JSON.stringify({ error: 'Ugyldig JSON i request body' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (!gyldigTjenestestatus(body)) {
            logger.error({ x_trace_id: traceId }, 'Ugyldig request format');
            return new Response(
                JSON.stringify({
                    error: 'Ugyldig request format',
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                },
            );
        }

        const { tjenestestatus } = body;

        const urlWithPath = `${TJENESTESTATUS_API_URL}/${tjenestestatus}`;
        logger.info({ x_trace_id: traceId }, `Starter PUT ${urlWithPath}`);

        const response = await fetch(urlWithPath, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
                'x-trace-id': traceId,
                Authorization: `Bearer ${tokenXToken.token}`,
            },
        });

        logger.info({ x_trace_id: traceId }, `Ferdig PUT ${urlWithPath} ${response.status} ${response.statusText}`);

        let data = null;
        if (response.headers.get('content-type')?.includes('application/json')) {
            data = await response.json();
        }

        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error: any) {
        error.x_trace_id = traceId;
        logger.error(error, `Feil fra PUT ${TJENESTESTATUS_API_URL}`);
        return new Response(null, { status: 500 });
    }
};
