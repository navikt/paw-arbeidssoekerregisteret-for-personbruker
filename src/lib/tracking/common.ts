import { getCurrentConsent } from '@navikt/nav-dekoratoren-moduler';

export type AktivitetData =
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
    | { aktivitet: 'Trykker på "Gå til Bekreftelse" fra forsiden' }
    | { aktivitet: 'Trykker på "Les mer om å bekrefte at du vil være arbeidssøker" på nav.no fra varsel på forsiden' }
    | { aktivitet: 'Trykker på "Les mer om å bekrefte at du vil være arbeidssøker"' }
    | { aktivitet: 'Trykker på "Kontakt oss" fra avbryt bekreftelse' };

export const isConsentingToAnalytics = () => {
    const currentConsent = getCurrentConsent() ?? {
        consent: {
            analytics: false,
            surveys: false,
        },
        meta: {
            createdAt: '',
            updatedAt: '',
            version: -1,
        },
        userActionTaken: false,
    };
    return currentConsent.consent.analytics;
};
