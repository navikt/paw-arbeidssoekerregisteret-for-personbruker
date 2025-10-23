import { describe, it, expect } from 'vitest';
import { opprettLinkTilArbeidsplassen } from './opprett-link-til-arbeidsplassen';
import { Fylke, StedSoek } from '@/model/brukerprofil';

const fylker: Fylke[] = [
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
];
const styrkOgSokeord = {
    soekeord: ['Utvikler'],
    // Dette er styrkkodene til "IT" og "Industri og produksjon"
    // Altså dette er level 2, som mappes til level 1
    styrk08: ['2514', '2166', '2320', '3121'],
};

const mockStedSoek: StedSoek = {
    soekType: 'STED_SOEK_V1',
    fylker: fylker,
    ...styrkOgSokeord,
};
const stedSoekUtenFylker: StedSoek = {
    soekType: 'STED_SOEK_V1',
    fylker: [],
    ...styrkOgSokeord,
};
const stedSoekUtenStyrk: StedSoek = {
    soekType: 'STED_SOEK_V1',
    fylker: fylker,
    soekeord: ['Utvikler'],
};
const tomtStedSoek: StedSoek = {
    soekType: 'STED_SOEK_V1',
    fylker: [],
    soekeord: [],
    styrk08: [],
};

describe('opprettLinkTilArbeidsplassen', () => {
    it('Oppretter riktig url med alle yrkeskategorier og fylker', () => {
        const url = opprettLinkTilArbeidsplassen(mockStedSoek);
        expect(url).toBe(
            'https://arbeidsplassen.nav.no/stillinger?v=5&occupationLevel1=Industri+og+produksjon&occupationLevel1=IT&occupationLevel1=Utdanning&county=BUSKERUD&county=OSLO',
        );
    });

    it('har korrekt base-url og query-parametre', () => {
        const url = opprettLinkTilArbeidsplassen(mockStedSoek);
        expect(url.startsWith('https://arbeidsplassen.nav.no/stillinger?')).toBe(true);

        const parsed = new URL(url);
        // occupationLevel1 skal finnes 3 ganger i riktig rekkefølge (vel...)
        expect(parsed.searchParams.getAll('occupationLevel1')).toEqual(['Industri og produksjon', 'IT', 'Utdanning']);
        // versjon
        expect(parsed.searchParams.get('v')).toBe('5');
    });

    it('enkoder mellomrom i yrkeskategorier', () => {
        const url = opprettLinkTilArbeidsplassen(mockStedSoek);
        // Rå substring for første kategori skal bruke + for mellomrom
        expect(url).toContain('occupationLevel1=Industri+og+produksjon');
    });

    it('håndterer søk uten fylker', () => {
        const url = opprettLinkTilArbeidsplassen(stedSoekUtenFylker);
        expect(url).toBe(
            'https://arbeidsplassen.nav.no/stillinger?v=5&occupationLevel1=Industri+og+produksjon&occupationLevel1=IT&occupationLevel1=Utdanning',
        );
    });
    it('håndterer søk uten styrk08', () => {
        const url = opprettLinkTilArbeidsplassen(stedSoekUtenStyrk);
        expect(url).toBe('https://arbeidsplassen.nav.no/stillinger?v=5&county=BUSKERUD&county=OSLO');
    });
    it('håndterer tomt søk', () => {
        const url = opprettLinkTilArbeidsplassen(tomtStedSoek);
        expect(url).toBe('https://arbeidsplassen.nav.no/stillinger?v=5');
    });
    it('kaster feil ved ugyldig input', () => {
        expect(() => opprettLinkTilArbeidsplassen(null as unknown as StedSoek)).toThrowError('StedSoek er påkrevd');
    });
});
