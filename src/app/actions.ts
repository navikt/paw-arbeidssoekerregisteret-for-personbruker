'use server';

import { stripBearer } from '@navikt/oasis/dist/strip-bearer';
import { logger } from '@navikt/next-logger';
import { headers } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

import { aggregertePerioderMockData, bekreftelserMedStatusMockdata } from './mockdata';
import { BekreftelserMedStatusResponse } from '@/model/bekreftelse';
import { requestTexasOboToken } from '@/lib/texas';
import { AggregertePerioder } from '@navikt/arbeidssokerregisteret-utils';

const brukerMock = process.env.ENABLE_MOCK === 'enabled';

async function getTokenXToken(
    idPortenToken: string,
    audience: string = `${process.env.NAIS_CLUSTER_NAME}:paw:paw-arbeidssoekerregisteret-api-oppslag`,
) {
    const oboToken = await requestTexasOboToken(idPortenToken, audience);

    if (!oboToken.ok) {
        logger.warn(oboToken.error);
        throw oboToken.error;
    }

    return oboToken.token;
}

interface AggregertePerioderProps {
    visKunSisteInformasjon?: boolean;
}

async function fetchAggregertePerioder(props: AggregertePerioderProps): Promise<{
    data?: AggregertePerioder;
    error?: Error & { traceId?: string; data?: any };
}> {
    if (brukerMock) {
        const infoData = props.visKunSisteInformasjon
            ? aggregertePerioderMockData.slice(0, 1)
            : aggregertePerioderMockData;
        return Promise.resolve({
            data: infoData as AggregertePerioder,
        });
    }
    const { visKunSisteInformasjon } = props;
    const AGGREGERTE_PERIODER_URL = `${process.env.OPPSLAG_API_V2_URL}/api/v1/arbeidssoekerperioder-aggregert${visKunSisteInformasjon ? '?siste=true' : ''}`;
    const audience = `${process.env.NAIS_CLUSTER_NAME}:paw:paw-arbeidssoekerregisteret-api-oppslag-v2`;
    try {
        const reqHeaders = await headers();
        const tokenXToken = await getTokenXToken(stripBearer(reqHeaders.get('authorization')!), audience);
        const traceId = uuidv4();
        logger.info({ x_trace_id: traceId }, `Starter GET ${AGGREGERTE_PERIODER_URL}`);

        const response = await fetch(AGGREGERTE_PERIODER_URL, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
                'x-trace-id': traceId,
                Authorization: `Bearer ${tokenXToken}`,
            },
        });

        logger.info(
            { x_trace_id: traceId },
            `Ferdig GET ${AGGREGERTE_PERIODER_URL} ${response.status} ${response.statusText}`,
        );

        if (!response.ok) {
            const error: any = new Error(`${response.status} ${response.statusText}`);
            error.traceId = response.headers.get('x-trace-id');
            try {
                error.data = await response.json();
            } catch (e) {}
            logger.error(error, `Feil fra GET ${AGGREGERTE_PERIODER_URL}`);
            return { error };
        }

        return { data: (await response.json()) as AggregertePerioder };
    } catch (error: any) {
        logger.error(error, `Feil fra GET ${AGGREGERTE_PERIODER_URL}`);
        return { error };
    }
}

async function fetchTilgjengeligEgenvurdering(): Promise<{ data?: any; error?: any }> {
    if (brukerMock) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        grunnlag: {
                            profileringId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                            profilertTil: 'ANTATT_GODE_MULIGHETER',
                        },
                    },
                });
            }, 3000);
        });
        // return Promise.resolve({ data: {}});
    }

    const EGENVURDERING_API_URL = `${process.env.EGENVURDERING_API_URL}/api/v1/arbeidssoeker/profilering/egenvurdering/grunnlag`;

    try {
        const reqHeaders = await headers();
        const audience = `${process.env.NAIS_CLUSTER_NAME}:paw:paw-arbeidssoekerregisteret-api-egenvurdering`;
        const tokenXToken = await getTokenXToken(stripBearer(reqHeaders.get('authorization')!), audience);
        const traceId = uuidv4();
        logger.info({ x_trace_id: traceId }, `Starter GET ${EGENVURDERING_API_URL}`);

        const response = await fetch(EGENVURDERING_API_URL, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
                'x-trace-id': traceId,
                Authorization: `Bearer ${tokenXToken}`,
            },
        });

        logger.info(
            { x_trace_id: traceId },
            `Ferdig GET ${EGENVURDERING_API_URL} ${response.status} ${response.statusText}`,
        );

        if (!response.ok) {
            const error: any = new Error(`${response.status} ${response.statusText}`);
            error.traceId = response.headers.get('x-trace-id');
            try {
                error.data = await response.json();
            } catch (e) {}
            logger.error(error, `Feil fra GET ${EGENVURDERING_API_URL}`);
            return { error };
        }

        return { data: await response.json() };
    } catch (error) {
        logger.error(error, `Feil fra GET ${EGENVURDERING_API_URL}`);
        return { error };
    }
}

interface BekreftelserMedStatusProps {
    perioder: string[];
}

async function fetchBekreftelserMedStatus(props: BekreftelserMedStatusProps): Promise<{
    data?: BekreftelserMedStatusResponse;
    error?: Error & { traceId?: string; data?: any };
}> {
    if (brukerMock) {
        return Promise.resolve({
            data: bekreftelserMedStatusMockdata,
        });
    }
    const { perioder } = props;
    const BEKREFTELSER_MED_STATUS_URL = `${process.env.OPPSLAG_API_V2_URL}/api/v2/bekreftelser`;
    const audience = `${process.env.NAIS_CLUSTER_NAME}:paw:paw-arbeidssoekerregisteret-api-oppslag-v2`;
    try {
        const reqHeaders = await headers();
        const tokenXToken = await getTokenXToken(stripBearer(reqHeaders.get('authorization')!), audience);
        logger.info(`Starter POST ${BEKREFTELSER_MED_STATUS_URL}`);

        const response = await fetch(BEKREFTELSER_MED_STATUS_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
                Authorization: `Bearer ${tokenXToken}`,
            },
            body: JSON.stringify({ perioder: perioder }),
        });

        logger.info(`Ferdig POST ${BEKREFTELSER_MED_STATUS_URL} ${response.status} ${response.statusText}`);

        if (!response.ok) {
            const error: any = new Error(`${response.status} ${response.statusText}`);
            try {
                error.data = await response.json();
            } catch (e) {}
            logger.error(error, `Feil fra POST ${BEKREFTELSER_MED_STATUS_URL}`);
            return { error };
        }

        return { data: (await response.json()) as BekreftelserMedStatusResponse };
    } catch (error: any) {
        logger.error(error, `Feil fra POST ${BEKREFTELSER_MED_STATUS_URL}`);
        return { error };
    }
}

export { fetchAggregertePerioder, fetchTilgjengeligEgenvurdering, fetchBekreftelserMedStatus, getTokenXToken };
