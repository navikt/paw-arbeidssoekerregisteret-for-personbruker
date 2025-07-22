import { isEnabled } from '@/lib/unleash-is-enabled';
import { NextRequest } from 'next/server';
import { HttpResponse } from 'msw';

const brukerMock = process.env.ENABLE_MOCK === 'enabled';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const toggle = searchParams.get('toggle');

    if (!toggle) {
        return new HttpResponse(null, { status: 400 });
    }

    if (brukerMock) {
        return HttpResponse.json({
            [toggle]: true,
        });
    }

    const enabled = await isEnabled(toggle);
    return HttpResponse.json({ [toggle]: enabled });
}
