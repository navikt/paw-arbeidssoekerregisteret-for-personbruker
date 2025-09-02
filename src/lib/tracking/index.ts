import { AktivitetData, isConsentingToAnalytics } from '@/lib/tracking/common';
import { logAmplitudeEvent } from '@/lib/tracking/amplitude';
import { logUmamiEvent } from '@/lib/tracking/umami';

export async function loggAktivitet(data: AktivitetData) {
    if (!isConsentingToAnalytics()) {
        return;
    }

    const eventName = 'arbeidssoekerregisteret-for-personbruker.aktivitet';
    const eventData = data || ({} as AktivitetData);
    logAmplitudeEvent(eventName, eventData);
    await logUmamiEvent(eventName, eventData);
}
