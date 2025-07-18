import { AktivitetData } from '@/lib/tracking/common';
const brukerMock = process.env.NEXT_PUBLIC_ENABLE_MOCK === 'enabled';

export function logUmamiEvent(eventName: string, data: AktivitetData) {
    // @ts-ignore
    if (!window.umami) {
        console.warn('umami ikke lastet');
    }
    if (!brukerMock) {
        // @ts-ignore
        window.umami.track(eventName, data);
    } else {
        console.log(`Logger til umami: ${eventName}`, data);
    }
}
