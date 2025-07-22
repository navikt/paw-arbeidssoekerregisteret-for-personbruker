import { AktivitetData } from '@/lib/tracking/common';
import { logAmplitudeEvent } from '@/lib/tracking/amplitude';
import { logUmamiEvent } from '@/lib/tracking/umami';

export function loggAktivitet(data: AktivitetData) {
    const eventData = data || ({} as AktivitetData);
    //@ts-ignore
    const trackingFn = Boolean(window.umami) ? logUmamiEvent : logAmplitudeEvent;
    trackingFn('arbeidssoekerregisteret-for-personbruker.aktivitet', eventData);
}
