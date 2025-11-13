import { v4 as uuidv4 } from 'uuid';
import { headers } from 'next/headers';
import { logger } from '@navikt/next-logger';
import { getToken, requestOboToken } from '@navikt/oasis';

const brukerMock = process.env.ENABLE_MOCK === 'enabled';
const EGENVURDERING_CLIENT_ID = `${process.env.NAIS_CLUSTER_NAME}:paw:paw-arbeidssoekerregisteret-api-egenvurdering`;
const EGENVURDERING_API_URL = `${process.env.EGENVURDERING_API_URL}/api/v1/arbeidssoeker/profilering/egenvurdering`;

export const POST = async (request: Request) => {
    if (brukerMock) {
        return new Response(null, { status: 204 });
    }

    const traceId = uuidv4();

    try {
        const tokenXToken = await requestOboToken(getToken(await headers())!, EGENVURDERING_CLIENT_ID);

        if (!tokenXToken.ok) {
            return new Response(null, { status: 401 });
        }

        logger.info({ x_trace_id: traceId }, `Starter POST ${EGENVURDERING_API_URL}`);

        const body = await request.json();
        const response = await fetch(EGENVURDERING_API_URL, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
                'x-trace-id': traceId,
                Authorization: `Bearer ${tokenXToken.token}`,
            },
        });

        logger.info(
            { x_trace_id: traceId },
            `Ferdig POST ${EGENVURDERING_API_URL} ${response.status} ${response.statusText}`,
        );

        let data = null;
        if (response.headers.get('content-type')?.includes('application/json')) {
            data = await response.json();
        }

        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error: any) {
        error.x_trace_id = traceId;
        logger.error(error, `Feil fra POST ${EGENVURDERING_API_URL}`);
        return new Response(null, { status: 500 });
    }
};
