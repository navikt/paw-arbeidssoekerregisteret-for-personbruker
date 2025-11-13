import { logger } from '@navikt/next-logger';
import { headers } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { getToken, requestOboToken } from '@navikt/oasis';

const brukerMock = process.env.ENABLE_MOCK === 'enabled';
const BRUKERPROFIL_CLIENT_ID = `${process.env.NAIS_CLUSTER_NAME}:paw:paw-arbeidssoekerregisteret-api-mine-stillinger`;
const STILLINGSSOEK_API_URL = `${process.env.BRUKERPROFIL_API_URL}/api/v1/brukerprofil/stillingssoek`;

/**
 * PUT endepunktet for `stillingsoek` i brukerprofil API.
 * Oppdaterer brukerens stillingsøk informasjon.
 *
 * @param {Stillingssoek} - stillingsoek
 *
 * @eksempel
 * Request body:
 * ```tsx
 * fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/brukerprofil/stillingsoek`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer <token>',
    },
    body: JSON.stringify({
        // stillingsoek data
    }),
})
 * ```
 */
export const PUT = async (request: Request) => {
    if (brukerMock) {
        return new Response(null, { status: 204 });
    }

    const traceId = uuidv4();

    try {
        const tokenXToken = await requestOboToken(getToken(await headers())!, BRUKERPROFIL_CLIENT_ID);

        if (!tokenXToken.ok) {
            return new Response(null, { status: 401 });
        }

        logger.info({ x_trace_id: traceId }, `Starter PUT ${STILLINGSSOEK_API_URL}`);

        const body = await request.json();
        const response = await fetch(STILLINGSSOEK_API_URL, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
                'x-trace-id': traceId,
                Authorization: `Bearer ${tokenXToken.token}`,
            },
        });

        logger.info(
            { x_trace_id: traceId },
            `Ferdig PUT ${STILLINGSSOEK_API_URL} ${response.status} ${response.statusText}`,
        );

        if (response.status === 204) {
            return new Response(null, { status: 204 });
        }

        if (response.headers.get('content-type')?.includes('application/json')) {
            const data = await response.json();
            return new Response(JSON.stringify(data), {
                status: response.status,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const textData = await response.text();
        return new Response(textData, {
            status: response.status,
            headers: {
                'Content-Type': response.headers.get('content-type') || 'text/plain',
            },
        });
    } catch (error: any) {
        error.x_trace_id = traceId;
        logger.error(error, `Feil fra PUT ${STILLINGSSOEK_API_URL}`);
        return new Response(null, { status: 500 });
    }
};
