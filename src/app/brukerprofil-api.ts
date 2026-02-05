import { Brukerprofil, LedigeStillinger } from '@/model/brukerprofil';
import { headers } from 'next/headers';
import { logger } from '@navikt/next-logger';
import { getTokenXToken } from '@/app/actions';
import { getToken } from '@navikt/oasis';

const brukerMock = process.env.ENABLE_MOCK === 'enabled';

async function getBrukerprofilApi<T>(path: string): Promise<{
    data?: T;
    error?: Error & { traceId?: string; data?: any };
}> {
    const BRUKERPROFIL_URL = `${process.env.BRUKERPROFIL_API_URL}${path}`;
    const audience = `${process.env.NAIS_CLUSTER_NAME}:paw:paw-arbeidssoekerregisteret-api-mine-stillinger`;
    try {
        const tokenXToken = await getTokenXToken(getToken(await headers()), audience);
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
                error.status = response.status;
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
                tjenestestatus: 'INAKTIV',
                stillingssoek: [],
            },
        });
    }

    return getBrukerprofilApi<Brukerprofil>('/api/v1/brukerprofil');
}

async function fetchLedigStillinger(): Promise<{
    data?: LedigeStillinger;
    error?: Error & { traceId?: string; data?: any };
}> {
    if (brukerMock) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        sistKjoert: '2025-10-20T12:00:00Z',
                        soek: {
                            soekType: 'STED_SOEK_V1',
                            fylker: [
                                {
                                    navn: 'Buskerud',
                                    kommuner: [
                                        {
                                            navn: 'Bergen',
                                            kommunenummer: '4601',
                                        },
                                    ],
                                    fylkesnummer: '46',
                                },
                            ],
                            soekeord: [],
                            styrk08: ['1330'],
                        },
                        resultat: [
                            {
                                arbeidsplassenNoId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                                tittel: 'Vi du jobbe som utvikler hos oss?',
                                stillingbeskrivelse: 'Backendutikler/Java',
                                publisert: '2025-10-17T10:30:00Z',
                                soeknadsfrist: {
                                    raw: 'Her kan det stå hva som helst dersom fristType er Ukjent',
                                    fristType: 'Ukjent',
                                    dato: '2025-11-25',
                                },
                                land: 'Norge',
                                kommune: 'Oslo',
                                sektor: 'Offentlig',
                                selskap: 'Snedige Løsninger AS',
                            },
                        ],
                    },
                });
            }, 1000);
        });
    }

    return getBrukerprofilApi<LedigeStillinger>('/api/v1/ledigestillinger?pageSize=14');
}

async function fetchKodeverkFylker() {
    return getBrukerprofilApi<LedigeStillinger>('/api/v1/kodeverk/fylker');
}
export { fetchBrukerprofil, fetchLedigStillinger, fetchKodeverkFylker };
