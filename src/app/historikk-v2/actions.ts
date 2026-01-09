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
// const OPPSLAG_V2_SCOPE = `api://${process.env.NAIS_CLUSTER_NAME}.paw.paw-arbeidssoekerregisteret-api-oppslag-v2/.default`;
const OPPSLAG_V2_SCOPE = `${process.env.NAIS_CLUSTER_NAME}:paw:paw-arbeidssoekerregisteret-api-oppslag-v2`;

export async function getPerioder(): Promise<Periode[] | null> {
    if (brukerMock) {
        const { default: perioder } = await import('@/mocks/perioder.json', {
            with: { type: 'json' },
        });
        await new Promise((resolve) => setTimeout(resolve, 1200));
        // @ts-expect-error - Its 100% correct, but TS is being difficult
        return perioder;
    }

    if (!OPPSLAG_V2_URL) {
        throw new Error('OPPSLAG_V2_URL is not defined');
    }

    const PERIODER_URL = `${OPPSLAG_V2_URL}/api/v3/perioder`;

    const incomingToken = getToken(await headers());
    if (!incomingToken) {
        throw new Error('Missing incoming token');
    }
    const tokenXToken = await getTokenXToken(incomingToken, OPPSLAG_V2_SCOPE);
    const parsedToken = parseIdportenToken(incomingToken);

    const identitetsnummer = parsedToken.ok ? parsedToken.pid : null;
    if (!identitetsnummer) {
        throw new Error('Could not parse identitetsnummer from token');
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
            throw error;
        }

        return await response.json();
    } catch (e) {
        logger.error(e, `Feil fra POST ${PERIODER_URL}`);
        throw e;
    }
}
