import { Bekreftelse, BekreftelseStatus } from '@navikt/arbeidssokerregisteret-utils';

export interface BekreftelseMedStatusResponse {
    status?: BekreftelseStatus;
    bekreftelse: Bekreftelse;
}

export interface AggregerteBekreftelser {
    [index: string]: Bekreftelse[];
}

export interface BekreftelserMedStatusResponse {
    bekreftelser: BekreftelseMedStatusResponse[];
}

export interface BekreftelseSkjemaType {
    harJobbetIDennePerioden: boolean;
    vilFortsetteSomArbeidssoeker: boolean;
    bekreftelseId: string;
}
