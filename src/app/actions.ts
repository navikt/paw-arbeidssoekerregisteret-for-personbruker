'use server';

import { requestTokenxOboToken } from '@navikt/oasis';
import { stripBearer } from '@navikt/oasis/dist/strip-bearer';
import { logger } from '@navikt/next-logger';
import { headers } from 'next/headers';
import { SamletInformasjon } from '@navikt/arbeidssokerregisteret-utils';
import { v4 as uuidv4 } from 'uuid';

import { aggregertePerioderMockData, samletInformasjonMockData, sisteSamletInformasjonMockData } from './mockdata';
import { AggregertePerioder } from '../../types/aggregerte-perioder';

const brukerMock = process.env.ENABLE_MOCK === 'enabled';

async function getTokenXToken(
    idPortenToken: string,
    audience: string = `${process.env.NAIS_CLUSTER_NAME}:paw:paw-arbeidssoekerregisteret-api-oppslag`,
) {
    const oboToken = await requestTokenxOboToken(idPortenToken, audience);

    if (!oboToken.ok) {
        logger.warn(oboToken.error);
        throw oboToken.error;
    }

    return oboToken.token;
}

interface SamletInformasjonProps {
    visKunSisteInformasjon?: boolean;
}

async function fetchSamletInformasjon(props: SamletInformasjonProps): Promise<{
    data?: SamletInformasjon;
    error?: Error & { traceId?: string; data?: any };
}> {
    if (brukerMock) {
        const infoData = props.visKunSisteInformasjon ? sisteSamletInformasjonMockData : samletInformasjonMockData;
        return Promise.resolve({
            data: infoData as SamletInformasjon,
        });
    }
    const { visKunSisteInformasjon } = props;
    const SISTE_SAMLET_INFORMASJON_URL = `${process.env.ARBEIDSSOEKERREGISTERET_OPPSLAG_API_URL}/api/v1/samlet-informasjon${visKunSisteInformasjon ? '?siste=true' : ''}`;
    try {
        const reqHeaders = await headers();
        const tokenXToken = await getTokenXToken(stripBearer(reqHeaders.get('authorization')!));
        const traceId = uuidv4();
        logger.info({ x_trace_id: traceId }, `Starter GET ${SISTE_SAMLET_INFORMASJON_URL}`);

        const response = await fetch(SISTE_SAMLET_INFORMASJON_URL, {
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

        return { data: (await response.json()) as SamletInformasjon };
    } catch (error: any) {
        logger.error(error, `Feil fra GET ${SISTE_SAMLET_INFORMASJON_URL}`);
        return { error };
    }
}

interface AggregertePerioderProps {
    visKunSisteInformasjon?: boolean;
}

async function fetchAggregertePerioder(props: AggregertePerioderProps): Promise<{
    data?: AggregertePerioder;
    error?: Error & { traceId?: string; data?: any };
}> {
    if (brukerMock) {
        const infoData = props.visKunSisteInformasjon ? aggregertePerioderMockData : aggregertePerioderMockData;
        return Promise.resolve({
            data: infoData as AggregertePerioder,
        });
    }
    const { visKunSisteInformasjon } = props;
    const AGGREGERTE_PERIODER_URL = `${process.env.ARBEIDSSOEKERREGISTERET_OPPSLAG_API_URL}/api/v1/arbeidssoekerperioder-aggregert${visKunSisteInformasjon ? '?siste=true' : ''}`;
    try {
        const reqHeaders = await headers();
        const tokenXToken = await getTokenXToken(stripBearer(reqHeaders.get('authorization')!));
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
        const audience = `${process.env.NAIS_CLUSTER_NAME}:paw:paw-arbeidssoekerregisteret-egenvurdering-api`;
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

export { fetchSamletInformasjon, fetchAggregertePerioder, fetchTilgjengeligEgenvurdering };
