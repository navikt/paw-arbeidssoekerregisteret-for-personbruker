import { headers } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { stripBearer } from '@navikt/oasis/dist/strip-bearer';
import { logger } from '@navikt/next-logger';
import { parseIdportenToken, requestTokenxOboToken } from '@navikt/oasis';
import { IdportenPayload } from '@navikt/oasis/dist/validate';

const brukerMock = process.env.ENABLE_MOCK === 'enabled';
const BEKREFTELSE_URL = `${process.env.BEKREFTELSE_API_URL}/api/v1/bekreftelse`;
const BEKREFTELSE_API_CLIENT_ID = `${process.env.NAIS_CLUSTER_NAME}:paw:paw-arbeidssoekerregisteret-api-bekreftelse`;

export const POST = async (request: Request) => {
    if (brukerMock) {
        return new Response(null, { status: 204 });
        // return new Response(JSON.stringify({ foo: 'bar' }), { status: 400, headers: { 'content-type': 'application/json'} });
    }

    const traceId = uuidv4();

    try {
        const reqHeaders = await headers();
        const idPortenToken = stripBearer(reqHeaders.get('authorization')!);
        const tokenXToken = await requestTokenxOboToken(idPortenToken, BEKREFTELSE_API_CLIENT_ID);

        if (!tokenXToken.ok) {
            return new Response(null, { status: 401 });
        }

        logger.info({ x_trace_id: traceId }, `Starter POST ${BEKREFTELSE_URL}`);

        const identitetsnummer = (parseIdportenToken(idPortenToken) as IdportenPayload).pid;
        const body = await request.json();

        const response = await fetch(BEKREFTELSE_URL, {
            method: 'POST',
            body: JSON.stringify({ ...body, identitetsnummer }),
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
                'x-trace-id': traceId,
                Authorization: `Bearer ${tokenXToken.token}`,
            },
        });

        logger.info(
            { x_trace_id: traceId },
            `Ferdig POST ${BEKREFTELSE_URL} ${response.status} ${response.statusText}`,
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
        logger.error(error, `Feil fra POST ${BEKREFTELSE_URL}`);
        return new Response(null, { status: 500 });
    }
};
