export type InnsendtBekreftelse = {
    periodeId: string;
    bekreftelsesloesning: string;
    svar: {
        sendtInn: {
            tidspunkt: string;
            utfoertAv: {
                type: string;
                id: string;
            };
            kilde: string;
            aarsak: string;
            tidspunktFraKilde: {
                tidspunkt: string;
                avviksType: string;
            };
        };
        gjelderFra: string;
        gjelderTil: string;
        harJobbetIDennePerioden: boolean;
        vilFortsetteSomArbeidssoeker: boolean;
    };
};
