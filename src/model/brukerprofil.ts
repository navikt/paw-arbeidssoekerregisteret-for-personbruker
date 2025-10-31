/**
 * Autogenererte typer fra openapi-spec i monorepo ekstern via hey-api
 * Les mer her: https://heyapi.dev/openapi-ts/get-started
 * OpenApi-Spec: https://raw.githubusercontent.com/navikt/paw-arbeidssoekerregisteret-monorepo-ekstern/refs/heads/main/apps/mine-stillinger-api/src/main/resources/openapi/openapi-spec.yaml
 */
export type Tjenestestatus = 'AKTIV' | 'INAKTIV' | 'OPT_OUT' | 'KAN_IKKE_LEVERES';

export type Brukerprofil = {
    identitetsnummer: string;
    tjenestestatus: Tjenestestatus;
    stillingssoek?: Array<Stillingssoek>;
};

export type Stillingssoek =
    | ({
          soekType: 'STED_SOEK_V1';
      } & StedSoek)
    | ({
          soekType: 'REISEVEI_SOEK_V1';
      } & ReiseveiSoek);

export type StedSoek = {
    soekType: 'STED_SOEK_V1';
    fylker: Array<Fylke>;
    soekeord: Array<string>;
    styrk08?: Array<string>;
};

export type Fylke = {
    navn: string;
    kommuner: Array<Kommune>;
    fylkesnummer?: string;
};

export type Kommune = {
    navn: string;
    kommunenummer: string;
};

export type Styrk = {
    /**
     * Level 1-4
     */
    level: string;
    code: string;
    name: string;
};

export type StyrkTreNode = {
    styrk: Styrk;
    /**
     * Tom dersom dette er et blad i treet (styrk kode på nivå 4).
     */
    children: Array<StyrkTreNode>;
};

/**
 * Denne søketypen er ikke støttet ennå, og blir kanskje aldri støttet.
 */
export type ReiseveiSoek = {
    soekType: 'REISEVEI_SOEK_V1';
    maksAvstandKm: number;
    postnummer: string;
    soekeord: Array<string>;
};

export type LedigeStillinger = {
    sistKjoert?: string;
    soek: Stillingssoek;
    resultat: Array<JobbAnnonse>;
};

export type JobbAnnonse = {
    arbeidsplassenNoId: string;
    tittel: string;
    stillingbeskrivelse?: string;
    publisert: string;
    soeknadsfrist: Soeknadsfrist;
    land: string;
    kommune?: string;
    sektor: Sektor;
    selskap: string;
};

export type Soeknadsfrist = {
    /**
     * Tekst fra datasettet for egenskapen søknadsfrist
     */
    raw?: string;
    /**
     * Hvilken type frist er det
     */
    fristType?: 'Ukjent' | 'Snarest' | 'Dato';
    /**
     * Søknadsfrist, bare med dersom 'fristType' er Dato
     */
    dato?: string;
};

export type Sektor = 'Offentlig' | 'Privat' | 'Ukjent';

// Brukt for api-route (PUT) av tjenestestatus
export type TjenestestatusRequest = {
    tjenestestatus: Tjenestestatus;
};
