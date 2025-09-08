import { getAnalyticsInstance } from '@navikt/nav-dekoratoren-moduler';
import { EventData } from '@/lib/tracking/common';

const brukerMock = process.env.NEXT_PUBLIC_ENABLE_MOCK === 'enabled';

export async function logUmamiEvent(eventName: string, data: EventData) {
    try {
        if (!brukerMock) {
            const tracker = getAnalyticsInstance('arbeidssoekerregisteret-for-personbruker');
            await tracker(eventName, data);
        } else {
            console.log(`Logger til umami: ${eventName}`, data);
        }
    } catch (e) {
        console.warn('Feil ved logging til umami', e);
    }
}
