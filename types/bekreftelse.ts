export interface BekreftelseType {
    harJobbetIDennePerioden: boolean;
    vilFortsetteSomArbeidssoeker: boolean;
    bekreftelseId: string;
}
export interface TilgjengeligBekreftelse {
    periodeId: string;
    bekreftelseId: string;
    gjelderFra: string;
    gjelderTil: string;
}

export type TilgjengeligeBekreftelser = TilgjengeligBekreftelse[];
