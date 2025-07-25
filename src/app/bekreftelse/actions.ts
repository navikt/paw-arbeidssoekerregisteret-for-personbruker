'use server';

import { parseIdportenToken } from '@navikt/oasis';
import { stripBearer } from '@navikt/oasis/dist/strip-bearer';
import { logger } from '@navikt/next-logger';
import { headers } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { ApiResponse } from '../../../types/api-response';
import { requestTexasOboToken } from '@/lib/texas';
import { TilgjengeligeBekreftelser } from '@navikt/arbeidssokerregisteret-utils';

const brukerMock = process.env.ENABLE_MOCK === 'enabled';
const TILGJENGELIGE_BEKREFTELSER_URL = `${process.env.BEKREFTELSE_API_URL}/api/v1/tilgjengelige-bekreftelser`;

async function getTokenXToken(idPortenToken: string) {
    const oboToken = await requestTexasOboToken(
        idPortenToken,
        `${process.env.NAIS_CLUSTER_NAME}:paw:paw-arbeidssoekerregisteret-api-bekreftelse`,
    );

    if (!oboToken.ok) {
        logger.warn(oboToken.error);
        throw oboToken.error;
    }

    return oboToken.token;
}

async function fetchTilgjengeligeBekreftelser(): Promise<ApiResponse<TilgjengeligeBekreftelser>> {
    if (brukerMock) {
        return Promise.resolve({
            data: [
                {
                    gjelderFra: '2024-08-01',
                    gjelderTil: '2024-08-15',
                    bekreftelseId: '42',
                    periodeId: '1',
                },
            ],
        });
    }

    try {
        const reqHeaders = await headers();
        const idPortenToken = stripBearer(reqHeaders.get('authorization')!);
        const tokenXToken = await getTokenXToken(idPortenToken);
        const traceId = uuidv4();
        logger.info({ x_trace_id: traceId }, `Starter POST ${TILGJENGELIGE_BEKREFTELSER_URL}`);

        const parsedToken = parseIdportenToken(idPortenToken);
        const identitetsnummer = parsedToken.ok ? parsedToken.pid : null;

        const response = await fetch(TILGJENGELIGE_BEKREFTELSER_URL, {
            method: 'POST',
            body: JSON.stringify({ identitetsnummer }),
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
                'x-trace-id': traceId,
                Authorization: `Bearer ${tokenXToken}`,
            },
        });

        logger.info(
            { x_trace_id: traceId },
            `Ferdig POST ${TILGJENGELIGE_BEKREFTELSER_URL} ${response.status} ${response.statusText}`,
        );

        if (!response.ok) {
            const error: any = new Error(`${response.status} ${response.statusText}`);
            error.traceId = response.headers.get('x-trace-id');
            try {
                error.data = await response.json();
            } catch (e) {}
            logger.error(error, `Feil fra POST ${TILGJENGELIGE_BEKREFTELSER_URL}`);
            return { error };
        }

        return { data: await response.json() };
    } catch (error: any) {
        logger.error(error, `Feil fra POST ${TILGJENGELIGE_BEKREFTELSER_URL}`);
        return { error };
    }
}

export { fetchTilgjengeligeBekreftelser };
