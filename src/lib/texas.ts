import { TokenResult } from '@navikt/oasis';

export async function requestTexasOboToken(token: string, audience: string): Promise<TokenResult> {
    try {
        const response = await fetch(`${process.env.NAIS_TOKEN_EXCHANGE_ENDPOINT}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                identity_provider: 'tokenx',
                target: audience,
                user_token: token,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return {
                ok: true,
                token: data.access_token,
            };
        }
        return {
            ok: false,
            error: new Error(response.statusText),
        };
    } catch (error) {
        return { ok: false, error: error as Error };
    }
}
