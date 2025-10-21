export type Tjenestestatus = 'AKTIV' | 'OPT_OUT';

export type Brukerprofil = {
    identitetsnummer: string;
    kanTilbysTjenestenLedigeStillinger: boolean;
    erTjenestenLedigeStillingerAktiv: boolean;
}
