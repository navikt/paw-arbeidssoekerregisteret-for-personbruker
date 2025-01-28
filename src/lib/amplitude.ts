'use client';

import * as amplitude from '@amplitude/analytics-browser';
import { getCurrentConsent } from '@navikt/nav-dekoratoren-moduler';
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

const brukerMock = process.env.ENABLE_MOCK === 'enabled';

const getCookieConsent = () => {
    return getCurrentConsent() ?? {
        consent: {
            analytics: false,
            surveys: false
        },
        meta: {
            createdAt: '',
            updatedAt: '',
            version: -1
        },
        userActionTaken: false
    }
}

export const initAmplitude = async (apiKey: string) => {
    const currentConsent = getCookieConsent();
    if (!currentConsent.consent.analytics) {
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

type AktivitetData =
    | { aktivitet: 'Sender inn bekreftelse'; vilFortsetteSomArbeidssoeker: boolean }
    | { aktivitet: 'Avbryter avslutning av periode' }
    | { aktivitet: 'Trykker på "Avbryt" i bekreftelse-skjemaet' }
    | { aktivitet: 'Trykker på "Bekreft neste periode"' }
    | { aktivitet: 'Trykker på "Gå tilbake til min side" fra bekreftelse-kvittering' }
    | { aktivitet: 'Trykker på "Jeg ønsker å registrere meg på nytt" fra bekreftelse' }
    | { aktivitet: 'Trykker på "Legg til opplysninger"' }
    | { aktivitet: 'Trykker på "Endre opplysninger"' }
    | { aktivitet: 'Trykker på "Registrer deg som arbeidssøker"' }
    | { aktivitet: 'Går til siden for historikk' }
    | { aktivitet: 'Trykker på "Gå til Bekreftelse" fra forsiden' };

type EventData = VisningsData | AktivitetData;

function logAmplitudeEvent(eventName: string, data: EventData) {
    const currentConsent = getCookieConsent();
    if (!currentConsent.consent.analytics) {
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

export function loggAktivitet(data: AktivitetData) {
    const eventData = data || ({} as EventData);
    logAmplitudeEvent('arbeidssoekerregisteret-for-personbruker.aktivitet', eventData);
}
