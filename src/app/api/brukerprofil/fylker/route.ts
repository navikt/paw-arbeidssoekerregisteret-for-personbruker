import { fetchKodeverkFylker } from '@/app/brukerprofil-api';

export async function GET() {
    const { data, error } = await fetchKodeverkFylker();
    if (error) {
        return new Response(null, { status: (error as any).status ?? 500 });
    }

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
