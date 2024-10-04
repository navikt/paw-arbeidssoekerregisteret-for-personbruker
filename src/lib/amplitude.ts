'use client';
// import * as amplitude from '@amplitude/analytics-browser';

export const isProduction = () => {
    return /https:\/\/www.nav.no\/arbeidssoekerregisteret/.test(window.location.href);
};

const isDevelopment = () => /^http:\/\/localhost/.test(window.location.href);
const apiEndpoint = 'https://amplitude.nav.no/collect';

const AMPLITUDE_API_KEY_PROD = '913768927b84cde5eac0d0d18c737561';
const AMPLITUDE_API_KEY_TEST = '9845ded64c69cd068651cd0d968e0796';

const apiKey = isProduction() ? AMPLITUDE_API_KEY_PROD : AMPLITUDE_API_KEY_TEST;

const config = {
    saveEvents: false,
    includeUtm: true,
    includeReferrer: true,
    defaultTracking: false,
    trackingOptions: {
        ipAddress: false,
    },
};

export const initAmplitude = async () => {
    if (!isDevelopment()) {
        // amplitude.init(apiKey, undefined, { ...config, serverUrl: apiEndpoint });
    } else {
        console.info('Initialiserer amplitude');
    }
};

export type VisningsData =
    | { viser: 'IkkeAktivArbeidssøker' }
    | { viser: 'Bekreftelse'; antallTilgjengeligeBekreftelser: number; erAktivArbeidssoker: boolean }
    | { viser: 'ErrorBoundaryFeil'; error: any };

type AktivitetData =
    | { aktivitet: 'Sender inn bekreftelse'; vilFortsetteSomArbeidssoeker: boolean }
    | { aktivitet: 'Avbryter avslutning av periode' }
    | { aktivitet: 'Trykker på "Bekreft neste periode"' }
    | { aktivitet: 'Trykker på "Gå tilbake til min side" fra kvittering' }
    | { aktivitet: 'Trykker på "Jeg ønsker å registrere meg på nytt"' }
    | { aktivitet: 'Trykker på "Endre opplysninger"' };

type EventData = VisningsData | AktivitetData;

function logAmplitudeEvent(eventName: string, data: EventData) {
    const eventData = data || {};
    if (!isDevelopment()) {
        // amplitude.logEvent(eventName, { ...eventData });
    } else {
        console.log(`Logger til amplitude: ${eventName}`, data);
    }
}

export function loggVisning(data: VisningsData) {
    const eventData = data || ({} as EventData);
    logAmplitudeEvent('aia-bekreftelse.visning', eventData);
}

export function loggAktivitet(data: AktivitetData) {
    const eventData = data || ({} as EventData);
    logAmplitudeEvent('aia-bekreftelse.aktivitet', eventData);
}
