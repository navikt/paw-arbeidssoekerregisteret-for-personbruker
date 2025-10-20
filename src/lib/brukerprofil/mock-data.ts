export type BrukerprofilTemp = {
    identitetsnummer: string;
    kanTilbysTjenestenLedigeStillinger: boolean;
    erTjenestenLedigeStillingerAktiv: boolean;
    stillingssoek: Stillingssoek[];
    erIkkeInteressert: boolean;
};

export type Stillingssoek = {
    soekType: 'STED_SOEK_V1' | 'REISEVEI_SOEK_V1';
    fylker?: Fylker[];
    soekeord: string[];
    styrk08?: string[];
    maksAvstandKm?: number;
    postnummer?: string;
};

export type Fylker = {
    navn: string;
    kommuner?: Kommuner[];
    fylkesnummer: string;
};

export type Kommuner = {
    navn: string;
    kommunenummer: string;
};

export const mockBrukerprofil: BrukerprofilTemp = {
    identitetsnummer: '12345678901',
    kanTilbysTjenestenLedigeStillinger: true,
    erTjenestenLedigeStillingerAktiv: true,
    stillingssoek: [
        {
            soekType: 'STED_SOEK_V1',
            fylker: [
                {
                    navn: 'Buskerud',
                    kommuner: [
                        {
                            navn: 'Bergen',
                            kommunenummer: '4601',
                        },
                    ],
                    fylkesnummer: '33',
                },
                {
                    navn: 'Oslo',
                    fylkesnummer: '03',
                },
            ],
            soekeord: ['Utvikler'],
            styrk08: ['2514', '2166', '2320', '3121'],
        },
        {
            soekType: 'REISEVEI_SOEK_V1',
            maksAvstandKm: 42,
            postnummer: '5145',
            soekeord: ['Tryllekunstner'],
        },
    ],
    erIkkeInteressert: false,
};
