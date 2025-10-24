import { Brukerprofil, LedigeStillinger } from '@/model/brukerprofil';
import { headers } from 'next/headers';
import { stripBearer } from '@navikt/oasis/dist/strip-bearer';
import { logger } from '@navikt/next-logger';
import { getTokenXToken } from '@/app/actions';

const brukerMock = process.env.ENABLE_MOCK === 'enabled';

async function getBrukerprofilApi<T>(path: string): Promise<{
    data?: T;
    error?: Error & { traceId?: string; data?: any };
}> {
    const BRUKERPROFIL_URL = `${process.env.BRUKERPROFIL_API_URL}${path}`;
    const audience = `${process.env.NAIS_CLUSTER_NAME}:paw:paw-arbeidssoekerregisteret-api-mine-stillinger`;
    try {
        const reqHeaders = await headers();
        const tokenXToken = await getTokenXToken(stripBearer(reqHeaders.get('authorization')!), audience);
        logger.info(`Starter GET ${BRUKERPROFIL_URL}`);

        const response = await fetch(BRUKERPROFIL_URL, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
                Authorization: `Bearer ${tokenXToken}`,
            },
        });

        logger.info(`Ferdig GET ${BRUKERPROFIL_URL} ${response.status} ${response.statusText}`);

        if (!response.ok) {
            const error: any = new Error(`${response.status} ${response.statusText}`);
            try {
                error.data = await response.json();
            } catch (e) {}
            logger.error(error, `Feil fra GET ${BRUKERPROFIL_URL}`);
            return { error };
        }

        return { data: (await response.json()) as T };
    } catch (error: any) {
        logger.error(error, `Feil fra GET ${BRUKERPROFIL_URL}`);
        return { error };
    }
}

async function fetchBrukerprofil(): Promise<{
    data?: Brukerprofil;
    error?: Error & { traceId?: string; data?: any };
}> {
    if (brukerMock) {
        return Promise.resolve({
            data: {
                identitetsnummer: '42',
                tjenestestatus: 'AKTIV',
                stillingssoek: [],
            },
        });
    }

    return getBrukerprofilApi<Brukerprofil>('/api/v1/brukerprofil/');
}

async function fetchLedigStillinger() {
    if (brukerMock) {
        return Promise.resolve({
            data: {
                identitetsnummer: '42',
                tjenestestatus: 'AKTIV',
                stillingssoek: [],
            },
        });
    }

    return getBrukerprofilApi<LedigeStillinger>('/api/v1/ledigestillinger');
}

export { fetchBrukerprofil, fetchLedigStillinger };
