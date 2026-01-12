'use server';

import type { Periode } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { logger } from '@navikt/next-logger';
import { getToken, parseIdportenToken } from '@navikt/oasis';
import { headers } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { getTokenXToken } from '../actions';

interface ApiError extends Error {
    traceId?: string | null;
    data?: unknown;
}

const brukerMock = process.env.ENABLE_MOCK === 'enabled';
const OPPSLAG_V2_URL = process.env.OPPSLAG_API_V2_URL;
const OPPSLAG_V2_SCOPE = `${process.env.NAIS_CLUSTER_NAME}:paw:paw-arbeidssoekerregisteret-api-oppslag-v2`;

export async function getPerioder(): Promise<{ perioder: Periode[] | null; error?: ApiError }> {
    if (brukerMock) {
        const { default: perioder } = await import('@/mocks/perioder.json', {
            with: { type: 'json' },
        });
        await new Promise((resolve) => setTimeout(resolve, 1200));
        return {
            // @ts-expect-error - Its 100% correct, but TS is being difficult
            perioder,
        };
    }

    if (!OPPSLAG_V2_URL) {
        logger.error('OPPSLAG_V2_URL er ikke definert');
        return { perioder: null, error: new Error('En feil oppsto') };
    }

    const PERIODER_URL = `${OPPSLAG_V2_URL}/api/v3/perioder?ordering=DESC`;

    const incomingToken = getToken(await headers());
    if (!incomingToken) {
        logger.error('Mangler innkommende token');
        return { perioder: null, error: new Error('En feil oppsto') };
    }
    const tokenXToken = await getTokenXToken(incomingToken, OPPSLAG_V2_SCOPE);
    const parsedToken = parseIdportenToken(incomingToken);

    const identitetsnummer = parsedToken.ok ? parsedToken.pid : null;
    if (!identitetsnummer) {
        logger.error('Kunne ikke hente identitetsnummer fra token');
        return { perioder: null, error: new Error('En feil oppsto') };
    }

    const traceId = uuidv4();
    logger.info({ x_trace_id: traceId }, `Starter POST ${PERIODER_URL}`);

    try {
        const response = await fetch(PERIODER_URL, {
            method: 'POST',
            body: JSON.stringify({ type: 'IDENTITETSNUMMER', identitetsnummer }),
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
                'x-trace-id': traceId,
                Authorization: `Bearer ${tokenXToken}`,
            },
        });

        if (!response.ok) {
            const error = new Error(`${response.status} ${response.statusText}`) as ApiError;
            error.traceId = response.headers.get('x-trace-id');

            try {
                error.data = await response.json();
            } catch (_e) {
                // Ignorer feil ved parsing av JSON
            }
            logger.error(error, `Feil fra POST ${PERIODER_URL}`);
            return { perioder: null, error };
        }
        return { perioder: await response.json() };
    } catch (e) {
        logger.error(e, `Feil fra POST ${PERIODER_URL}`);
        return { perioder: null, error: e as ApiError };
    }
}
