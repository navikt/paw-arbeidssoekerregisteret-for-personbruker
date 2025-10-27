import { fetchLedigStillinger } from '@/app/brukerprofil-api';

export async function GET() {
    return new Response(JSON.stringify(await fetchLedigStillinger()), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
