import { headers } from 'next/headers';
import { decodeJwt } from 'jose';
import { getToken } from '@navikt/oasis';

const brukerMock = process.env.ENABLE_MOCK === 'enabled';

type AuthLevel = 'idporten-loa-substantial' | 'idporten-loa-high';

export async function hentInnloggingsNivaa(): Promise<{ data?: AuthLevel; error?: any }> {
    if (brukerMock) {
        return Promise.resolve({ data: 'idporten-loa-substantial' });
    }

    try {
        const token = getToken(await headers())!;
        const decodedToken = decodeJwt(token);
        return { data: decodedToken.acr as AuthLevel };
    } catch (error) {
        return { error };
    }
}
