import { Brukerprofil } from '@/model/brukerprofil';

export const mockBrukerprofil: Brukerprofil = {
    identitetsnummer: '12345678901',
    tjenestestatus: 'AKTIV',
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
                    kommuner: [],
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
};
