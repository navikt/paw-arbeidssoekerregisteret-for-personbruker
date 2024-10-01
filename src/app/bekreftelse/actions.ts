'use server';

import { requestTokenxOboToken } from '@navikt/oasis';
import { stripBearer } from '@navikt/oasis/dist/strip-bearer';
import { logger } from '@navikt/next-logger';
import { headers } from 'next/headers';

const brukerMock = process.env.ENABLE_MOCK === 'enabled';

async function getTokenXToken(incomingToken: string) {
    const oboToken = await requestTokenxOboToken(
        stripBearer(incomingToken),
        `${process.env.NAIS_CLUSTER_NAME}:paw:paw-arbeidssoekerregisteret-api-bekreftelse`,
    );

    if (!oboToken.ok) {
        logger.warn(oboToken.error);
        throw oboToken.error;
    }

    return oboToken.token;
}

async function fetchTilgjengeligeBekreftelser(): Promise<{
    data?: any;
    error?: Error & { traceId?: string; data?: any };
}> {
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

    const reqHeaders = headers();
    const token = await getTokenXToken(reqHeaders.get('authorization')!);
    const TILGJENGELIGE_BEKREFTELSER_URL = `${process.env.BEKREFTELSE_API_URL}/api/v1/tilgjengelige-bekreftelser`;

    logger.info(`Starter GET ${TILGJENGELIGE_BEKREFTELSER_URL}`);

    const response = await fetch(`${process.env.DETALJER_URL}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    logger.info(`Ferdig GET ${TILGJENGELIGE_BEKREFTELSER_URL} ${response.status} ${response.statusText}`);

    if (!response.ok) {
        const error: any = new Error(`${response.status} ${response.statusText}`);
        error.traceId = response.headers.get('x-trace-id');
        try {
            error.data = await response.json();
        } catch (e) {}
        logger.error(error, `Feil fra GET ${TILGJENGELIGE_BEKREFTELSER_URL}`);
        return { error };
    }

    return { data: await response.json() };
}

export { fetchTilgjengeligeBekreftelser };
