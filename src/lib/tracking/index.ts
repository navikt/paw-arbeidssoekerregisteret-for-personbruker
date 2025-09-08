import { AktivitetData, isConsentingToAnalytics, VisningsData } from '@/lib/tracking/common';
import { logUmamiEvent } from '@/lib/tracking/umami';

export async function loggAktivitet(data: AktivitetData) {
    if (!isConsentingToAnalytics()) {
        return;
    }

    const eventName = 'arbeidssoekerregisteret-for-personbruker.aktivitet';
    const eventData = data || ({} as AktivitetData);
    await logUmamiEvent(eventName, eventData);
}

export async function loggVisning(data: VisningsData) {
    const eventData = data || ({} as VisningsData);
    await logUmamiEvent('arbeidssoekerregisteret-for-personbruker.visning', eventData);
}
