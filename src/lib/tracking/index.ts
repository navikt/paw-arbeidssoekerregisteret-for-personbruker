import {
    AktivitetData,
    AktivitetEventNavn,
    isConsentingToAnalytics,
    VisningEventNavn,
    VisningsData,
} from '@/lib/tracking/common';
import { logUmamiEvent } from '@/lib/tracking/umami';

export async function loggAktivitet(data: AktivitetData) {
    if (!isConsentingToAnalytics()) {
        return;
    }

    const eventData = data || ({} as AktivitetData);
    await logUmamiEvent(AktivitetEventNavn, eventData);
}

export async function loggVisning(data: VisningsData) {
    const eventData = data || ({} as VisningsData);
    await logUmamiEvent(VisningEventNavn, eventData);
}
