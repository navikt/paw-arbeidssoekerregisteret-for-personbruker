'use server';

import { logger } from '@navikt/next-logger';
import { headers } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

import { snapshotMock } from './mockdata';
import { getToken, parseIdportenToken, requestOboToken } from '@navikt/oasis';
import { Snapshot } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';

const brukerMock = process.env.ENABLE_MOCK === 'enabled';

async function getTokenXToken(
    idPortenToken: string | null,
    audience: string = `${process.env.NAIS_CLUSTER_NAME}:paw:paw-arbeidssoekerregisteret-api-oppslag`,
) {
    if (!idPortenToken) {
        throw new Error('Missing bearer token');
    }

    const oboToken = await requestOboToken(idPortenToken, audience);

    if (!oboToken.ok) {
        logger.warn(oboToken.error);
        throw oboToken.error;
    }

    return oboToken.token;
}

async function fetchArbeidssoekerregisteretSnapshot(): Promise<{ data?: Snapshot; error?: any }> {
    if (brukerMock) {
        return Promise.resolve({
            data: snapshotMock,
        });
    }

    const PERIODER_SNAPSHOT_URL = `${process.env.OPPSLAG_API_V2_URL}/api/v3/snapshot`;
    const audience = `${process.env.NAIS_CLUSTER_NAME}:paw:paw-arbeidssoekerregisteret-api-oppslag-v2`;

    try {
        const idportenToken = getToken(await headers());
        const tokenXToken = await getTokenXToken(idportenToken, audience);
        const parsedToken = parseIdportenToken(idportenToken!);
        const identitetsnummer = parsedToken.ok ? parsedToken.pid : '';

        logger.info(`Starter POST ${PERIODER_SNAPSHOT_URL}`);
        const response = await fetch(PERIODER_SNAPSHOT_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
                Authorization: `Bearer ${tokenXToken}`,
            },
            body: JSON.stringify({ type: 'IDENTITETSNUMMER', identitetsnummer }),
        });
        logger.info(`Ferdig POST ${PERIODER_SNAPSHOT_URL} ${response.status} ${response.statusText}`);

        if (!response.ok) {
            if (response.status === 404) {
                return { data: undefined };
            }

            const error: any = new Error(`${response.status} ${response.statusText}`);
            try {
                error.data = await response.json();
            } catch (e) {}
            logger.error(error, `Feil fra POST ${PERIODER_SNAPSHOT_URL}`);
            return { error };
        }

        return { data: (await response.json()) as Snapshot };
    } catch (error: any) {
        logger.error(error, `Feil fra POST ${PERIODER_SNAPSHOT_URL}`);
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
        const audience = `${process.env.NAIS_CLUSTER_NAME}:paw:paw-arbeidssoekerregisteret-api-egenvurdering`;
        const tokenXToken = await getTokenXToken(getToken(await headers()), audience);
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

export { fetchTilgjengeligEgenvurdering, getTokenXToken, fetchArbeidssoekerregisteretSnapshot };
