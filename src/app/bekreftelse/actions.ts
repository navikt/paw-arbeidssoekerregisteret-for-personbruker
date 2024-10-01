'use server';

import { parseIdportenToken, requestTokenxOboToken } from '@navikt/oasis';
import { stripBearer } from '@navikt/oasis/dist/strip-bearer';
import { logger } from '@navikt/next-logger';
import { headers } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

const brukerMock = process.env.ENABLE_MOCK === 'enabled';

async function getTokenXToken(idPortenToken: string) {
    const oboToken = await requestTokenxOboToken(
        idPortenToken,
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
    const idPortenToken = stripBearer(reqHeaders.get('authorization')!);
    const tokenXToken = await getTokenXToken(idPortenToken);
    const TILGJENGELIGE_BEKREFTELSER_URL = `${process.env.BEKREFTELSE_API_URL}/api/v1/tilgjengelige-bekreftelser`;

    logger.info(`Starter GET ${TILGJENGELIGE_BEKREFTELSER_URL}`);

    const response = await fetch(TILGJENGELIGE_BEKREFTELSER_URL, {
        method: 'POST',
        body: JSON.stringify({ identitetsnummer: parseIdportenToken(idPortenToken) }),
        headers: {
            'content-type': 'application/json',
            accept: 'application/json',
            'x-trace-id': uuidv4(),
            Authorization: `Bearer ${tokenXToken}`,
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
