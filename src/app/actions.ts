'use server';

import { requestTokenxOboToken } from '@navikt/oasis';
import { stripBearer } from '@navikt/oasis/dist/strip-bearer';
import { logger } from '@navikt/next-logger';
import { headers } from 'next/headers';
import { SamletInformasjon } from '@navikt/arbeidssokerregisteret-utils';
import { v4 as uuidv4 } from 'uuid';

import { behovsvurderingMockData, samletInformasjonMockData, sisteSamletInformasjonMockData } from './mockdata';
import { BehovsvurderingResponse } from '../../types/behovsvurdering';

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

interface SamletInformasjonProps {
    visKunSisteInformasjon?: boolean
}

async function fetchSamletInformasjon(props: SamletInformasjonProps): Promise<{
    data?: SamletInformasjon;
    error?: Error & { traceId?: string; data?: any };
}> {
    if (brukerMock) {
        const infoData = props.visKunSisteInformasjon ? sisteSamletInformasjonMockData : samletInformasjonMockData
        return Promise.resolve({
            data:  infoData as SamletInformasjon,
        });
    }
    const { visKunSisteInformasjon } = props
    const SISTE_SAMLET_INFORMASJON_URL = `${process.env.ARBEIDSSOEKERREGISTERET_OPPSLAG_API_URL}/api/v1/samlet-informasjon${visKunSisteInformasjon ? '?siste=true' : ''}`;
    try {
        const reqHeaders = headers();
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

async function fetchBehovsvurdering(): Promise<{
    data?: any;
    error?: Error & { traceId?: string; data?: any };
}> {
    if (brukerMock) {
        return Promise.resolve({
            data: behovsvurderingMockData as BehovsvurderingResponse,
        });
    }

    const BEHOVSVURDERING_URL = `${process.env.AIA_BACKEND_URL}/behov-for-veiledning`;
    try {
        const reqHeaders = headers();
        const tokenXToken = await getTokenXToken(stripBearer(reqHeaders.get('authorization')!));
        const traceId = uuidv4();
        logger.info({ x_trace_id: traceId }, `Starter GET ${BEHOVSVURDERING_URL}`);

        const response = await fetch(BEHOVSVURDERING_URL, {
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
            `Ferdig GET ${BEHOVSVURDERING_URL} ${response.status} ${response.statusText}`,
        );

        if (!response.ok) {
            const error: any = new Error(`${response.status} ${response.statusText}`);
            error.traceId = response.headers.get('x-trace-id');
            try {
                error.data = await response.json();
            } catch (e) {}
            logger.error(error, `Feil fra GET ${BEHOVSVURDERING_URL}`);
            return { error };
        }

        return { data: response.status === 204 ? null : (await response.json()) as BehovsvurderingResponse };
    } catch (error: any) {
        logger.error(error, `Feil fra GET ${BEHOVSVURDERING_URL}`);
        return { error };
    }
}

export { fetchSamletInformasjon, fetchBehovsvurdering };
