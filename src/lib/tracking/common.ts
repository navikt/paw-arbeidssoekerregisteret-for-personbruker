import { getCurrentConsent } from '@navikt/nav-dekoratoren-moduler';

export const AktivitetEventNavn = 'arbeidssoekerregisteret-for-personbruker.aktivitet';
export const VisningEventNavn = 'arbeidssoekerregisteret-for-personbruker.visning';
export const StyrkeloftEventNavn = 'arbeidssoekerregisteret-for-personbruker.styrkloft';
export const UnderkategoriFilterEventNavn = 'arbeidssoekerregisteret-for-personbruker.uk-filter';

export type VisningsData =
    | { viser: 'IkkeAktivArbeidssøker fra Bekreftelse' }
    | { viser: 'Bekreftelse'; antallTilgjengeligeBekreftelser: number; erAktivArbeidssoker: boolean }
    | { viser: 'ErrorBoundaryFeil'; error: any }
    | { viser: 'Egenvurdering' }
    | { viser: 'Egenvurdering avklart' };

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
    | { aktivitet: 'Trykker på "Kontakt oss" fra avbryt bekreftelse' }
    | { aktivitet: 'Trykker på "Klarer meg uten veileder"' }
    | { aktivitet: 'Trykker på "Behov for veileder"' };

export type StyrkeloftData =
    | { aktivitet: 'Går til annonse på arbeidsplassen' }
    | { aktivitet: 'Går til søk på arbeidsplassen' }
    | { aktivitet: 'Setter filter for sted' }
    | { aktivitet: 'Setter filter for yrkeskategori' }
    | { aktivitet: 'Avbryter avslutning av eksperiment' }
    | { aktivitet: 'Takker ja til å delta' }
    | { aktivitet: 'Takker nei til å delta' }
    | { aktivitet: 'Åpner flervalgsmeny' }
    | { aktivitet: 'Går til endre stillingssøk' }
    | { aktivitet: 'Kopierer lenke til stilling' }
    | { aktivitet: 'Trykker på pagineringsknapp' };

export type UnderkategoriFilterData =
    | { aktivitet: 'Trykker på velg alle' }
    | { aktivitet: 'Trykker på fjern alle' }
    | { aktivitet: 'Trykker på underkategori' }
    | { aktivitet: 'Trykker på hovedkategori' }
    | { aktivitet: 'Trykker på Chips' }
    | { aktivitet: 'Trykker på Tilbake' }
    | { aktivitet: 'Trykker på Lukk' };

export type EventData = VisningsData | AktivitetData | StyrkeloftData | UnderkategoriFilterData;

const defaultConsent = {
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

export const isConsentingToAnalytics = () => {
    const currentConsent = getCurrentConsent() ?? defaultConsent;
    return currentConsent.consent.analytics;
};

export const isConsentingToSurveys = () => {
    const currentConsent = getCurrentConsent() ?? defaultConsent;
    return currentConsent.consent.surveys;
};
