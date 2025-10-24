import { requestTexasOboToken } from '@/lib/texas';
import { logger } from '@navikt/next-logger';
import { stripBearer } from '@navikt/oasis/dist/strip-bearer';
import { headers } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

const brukerMock = process.env.ENABLE_MOCK === 'enabled';
const BRUKERPROFIL_CLIENT_ID = `${process.env.NAIS_CLUSTER_NAME}:paw:paw-arbeidssoekerregisteret-api-mine-stillinger`;
const BRUKERPROFIL_APÌ_URL = `${process.env.BRUKERPROFIL_API_URL}/api/v1/brukerprofil/stillingssoek`;

export const POST = async (request: Request) => {
    if (brukerMock) {
        return new Response(null, { status: 204 });
    }

    const traceId = uuidv4();

    try {
        const reqHeaders = await headers();
        const idPortenToken = stripBearer(reqHeaders.get('authorization')!);
        const tokenXToken = await requestTexasOboToken(idPortenToken, BRUKERPROFIL_CLIENT_ID);

        if (!tokenXToken.ok) {
            return new Response(null, { status: 401 });
        }

        logger.info({ x_trace_id: traceId }, `Starter POST ${BRUKERPROFIL_APÌ_URL}`);

        const body = await request.json();
        const response = await fetch(BRUKERPROFIL_APÌ_URL, {
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
            `Ferdig POST ${BRUKERPROFIL_APÌ_URL} ${response.status} ${response.statusText}`,
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
        logger.error(error, `Feil fra POST ${BRUKERPROFIL_APÌ_URL}`);
        return new Response(null, { status: 500 });
    }
};
