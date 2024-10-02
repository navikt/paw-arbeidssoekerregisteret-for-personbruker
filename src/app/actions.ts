'use server';

import { parseIdportenToken, requestTokenxOboToken } from '@navikt/oasis';
import { stripBearer } from '@navikt/oasis/dist/strip-bearer';
import { logger } from '@navikt/next-logger';
import { headers } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { mockData } from './mockdata';

const brukerMock = process.env.ENABLE_MOCK === 'enabled';

async function getTokenXToken(idPortenToken: string) {
    const oboToken = await requestTokenxOboToken(
        idPortenToken,
        `${process.env.NAIS_CLUSTER_NAME}:paw:paw-arbeidssoekerregisteret-api-oppslag`,
    );

    if (!oboToken.ok) {
        logger.warn(oboToken.error);
        throw oboToken.error;
    }

    return oboToken.token;
}

async function fetchSisteSamletInformasjon(): Promise<{
    data?: any;
    error?: Error & { traceId?: string; data?: any };
}> {
    if (brukerMock) {
        return Promise.resolve({
            data: mockData
        });
    }

    const reqHeaders = headers();
    const idPortenToken = stripBearer(reqHeaders.get('authorization')!);
    const tokenXToken = await getTokenXToken(idPortenToken);
    const SISTE_SAMLET_INFORMASJON_URL = `${process.env.ARBEIDSSOEKERREGISTERET_OPPSLAG_API_URL}/api/v1/samlet-informasjon?siste=true`;
    const traceId = uuidv4();
    logger.info({ x_trace_id: traceId }, `Starter GET ${SISTE_SAMLET_INFORMASJON_URL}`);

    const parsedToken = parseIdportenToken(idPortenToken);
    const identitetsnummer = parsedToken.ok ? parsedToken.pid : null;

    const response = await fetch(SISTE_SAMLET_INFORMASJON_URL, {
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
        `Ferdig GET ${SISTE_SAMLET_INFORMASJON_URL} ${response.status} ${response.statusText}`,
    );

    if (!response.ok) {
        const error: any = new Error(`${response.status} ${response.statusText}`);
        error.traceId = response.headers.get('x-trace-id');
        try {
            error.data = await response.json();
        } catch (e) {}
        logger.error(error, `Feil fra GET ${SISTE_SAMLET_INFORMASJON_URL}`);
        return { error };
    }

    return { data: await response.json() };
}

export { fetchSisteSamletInformasjon };