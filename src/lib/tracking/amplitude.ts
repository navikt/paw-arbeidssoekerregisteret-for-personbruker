'use client';

import * as amplitude from '@amplitude/analytics-browser';
import { awaitDecoratorData } from '@navikt/nav-dekoratoren-moduler';

import { AktivitetData, isConsentingToAnalytics } from '@/lib/tracking/common';

const apiEndpoint = 'https://amplitude.nav.no/collect';

const config = {
    saveEvents: false,
    includeUtm: true,
    includeReferrer: true,
    defaultTracking: false,
    trackingOptions: {
        ipAddress: false,
    },
};

const brukerMock = process.env.NEXT_PUBLIC_ENABLE_MOCK === 'enabled';

export const initAmplitude = async (apiKey: string) => {
    await awaitDecoratorData();

    if (!isConsentingToAnalytics()) {
        return;
    }

    if (!brukerMock) {
        amplitude.init(apiKey, undefined, { ...config, serverUrl: apiEndpoint });
    } else {
        console.info('Initialiserer amplitude');
    }
};

export type VisningsData =
    | { viser: 'IkkeAktivArbeidssøker fra Bekreftelse' }
    | { viser: 'Bekreftelse'; antallTilgjengeligeBekreftelser: number; erAktivArbeidssoker: boolean }
    | { viser: 'ErrorBoundaryFeil'; error: any };

type EventData = VisningsData | AktivitetData;

export function logAmplitudeEvent(eventName: string, data: EventData) {
    if (!isConsentingToAnalytics()) {
        return;
    }

    const eventData = data || {};
    if (!brukerMock) {
        amplitude.logEvent(eventName, { ...eventData });
    } else {
        console.log(`Logger til amplitude: ${eventName}`, data);
    }
}

export function loggVisning(data: VisningsData) {
    const eventData = data || ({} as EventData);
    logAmplitudeEvent('arbeidssoekerregisteret-for-personbruker.visning', eventData);
}
