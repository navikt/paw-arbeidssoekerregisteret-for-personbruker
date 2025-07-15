import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { requestTexasOboToken } from './texas';

describe('texas', () => {
    describe('requestTexasOboToken', () => {
        beforeAll(() => {
            process.env.NAIS_TOKEN_EXCHANGE_ENDPOINT = 'http://localhost:6767';
        });

        test('veksler token via texas', async () => {
            const spy = vi.fn();
            const server = setupServer(
                http.post('http://localhost:6767', async ({ request }) => {
                    const payload = await request.json();
                    spy(payload);
                    return HttpResponse.json({ access_token: 'access_token 123' });
                }),
            );

            try {
                server.listen();
                const result = await requestTexasOboToken('token', 'dev-gcp:paw:paw-arbeidssoekerregisteret-api-oppslag');
                expect(result.ok).toBe(true);
                expect(result.ok && result.token).toEqual('access_token 123');
                expect(spy).toHaveBeenCalledWith({
                    identity_provider: 'tokenx',
                    target: 'dev-gcp:paw:paw-arbeidssoekerregisteret-api-oppslag',
                    user_token: 'token',
                });
            } finally {
                server.close();
            }
        });

        test('returnerer ok:false ved feil fra texas', async () => {
            const server = setupServer(
                http.post('http://localhost:6767', async () => {
                    return new HttpResponse(null, { status: 400 });
                }),
            );

            try {
                server.listen();
                const result = await requestTexasOboToken('token', 'dev-gcp:paw:paw-arbeidssoekerregisteret-api-oppslag');
                expect(result.ok).toBe(false);
            } finally {
                server.close();
            }
        });
    });
});
