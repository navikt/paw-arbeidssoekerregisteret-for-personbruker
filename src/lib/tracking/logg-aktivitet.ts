import { AktivitetData } from '@/lib/tracking/common';
import { logAmplitudeEvent } from '@/lib/tracking/amplitude';
import { logUmamiEvent } from '@/lib/tracking/umami';
import { useFlag } from '@unleash/nextjs/client';
import unleashKeys from '@/unleash-keys';

export function loggAktivitet(data: AktivitetData) {
    const eventData = data || ({} as AktivitetData);
    //@ts-ignore
    const trackingFn = Boolean(window.umami) ? logUmamiEvent : logAmplitudeEvent;
    trackingFn('arbeidssoekerregisteret-for-personbruker.aktivitet', eventData);
}

export function useLoggAktivitet() {
    const brukUmami = useFlag(unleashKeys.BRUK_UMAMI);
    return (data: AktivitetData) => {
        const eventData = data || ({} as AktivitetData);
        const trackingFn = brukUmami ? logUmamiEvent : logAmplitudeEvent;
        trackingFn('arbeidssoekerregisteret-for-personbruker.aktivitet', eventData);
    };
}
