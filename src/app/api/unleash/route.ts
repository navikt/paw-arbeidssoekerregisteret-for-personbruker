import { isEnabled } from '@/lib/unleash-is-enabled';
import { NextRequest } from 'next/server';
import { HttpResponse } from 'msw';

const brukerMock = process.env.ENABLE_MOCK === 'enabled';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const toggles = searchParams.getAll('toggle');

    if (!toggles || toggles.length === 0) {
        return new HttpResponse(null, { status: 400 });
    }

    if (brukerMock) {
        const mockResponse = toggles.reduce((acc, key) => {
            return { ...acc, [key]: true };
        }, {});
        return HttpResponse.json(mockResponse);
    }

    const response = toggles.reduce(async (acc, key) => {
        return {
            ...acc,
            [key]: await isEnabled(key),
        };
    }, {});

    return HttpResponse.json(response);
}
