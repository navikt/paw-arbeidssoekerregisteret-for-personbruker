import {
    AktivitetData,
    AktivitetEventNavn,
    isConsentingToAnalytics,
    VisningEventNavn,
    VisningsData,
    StyrkeloftData,
    StyrkeloftEventNavn,
    UnderkategoriFilterData,
    UnderkategoriFilterEventNavn,
} from '@/lib/tracking/common';
import { logUmamiEvent } from '@/lib/tracking/umami';

export async function loggAktivitet(data: AktivitetData) {
    if (!isConsentingToAnalytics()) {
        return;
    }

    const eventData = data || ({} as AktivitetData);
    await logUmamiEvent(AktivitetEventNavn, eventData);
}

export async function loggStyrkeloft(data: StyrkeloftData) {
    if (!isConsentingToAnalytics()) {
        return;
    }

    const eventData = data || ({} as StyrkeloftData);
    await logUmamiEvent(StyrkeloftEventNavn, eventData);
}

export async function loggUnderkategoriFilter(data: UnderkategoriFilterData) {
    if (!isConsentingToAnalytics()) {
        return;
    }

    const eventData = data || ({} as UnderkategoriFilterData);
    await logUmamiEvent(UnderkategoriFilterEventNavn, eventData);
}

export async function loggVisning(data: VisningsData) {
    const eventData = data || ({} as VisningsData);
    await logUmamiEvent(VisningEventNavn, eventData);
}
