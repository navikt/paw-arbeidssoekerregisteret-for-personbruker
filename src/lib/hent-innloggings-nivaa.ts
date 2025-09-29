import { headers } from 'next/headers';
import { stripBearer } from '@navikt/oasis/dist/strip-bearer';
import { decodeJwt } from 'jose';

const brukerMock = process.env.ENABLE_MOCK === 'enabled';

type AuthLevel = 'idporten-loa-substantial' | 'idporten-loa-high';

export async function hentInnloggingsNivaa(): Promise<{ data?: AuthLevel, error?: any }> {
    if (brukerMock) {
        return Promise.resolve({ data: 'idporten-loa-substantial' });
    }

    try {
        const reqHeaders = await headers();
        const token = stripBearer(reqHeaders.get('authorization')!);
        const decodedToken = decodeJwt(token);
        return { data: decodedToken.acr as AuthLevel };
    } catch(error) {
        return { error };
    }
}
