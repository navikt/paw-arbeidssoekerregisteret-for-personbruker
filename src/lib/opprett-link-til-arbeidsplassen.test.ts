import { describe, expect, it } from 'vitest';
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
    soekeord: [],
    styrk08: ['1330', '2166', '2514', '3514'], // Alle styrkkoder for IT
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
            'https://arbeidsplassen.nav.no/stillinger?v=5&occupationLevel1=IT&county=BUSKERUD&county=OSLO',
        );
    });

    it('har korrekt base-url og query-parametre', () => {
        const url = opprettLinkTilArbeidsplassen(mockStedSoek);
        expect(url.startsWith('https://arbeidsplassen.nav.no/stillinger?')).toBe(true);

        const parsed = new URL(url);
        expect(parsed.searchParams.getAll('occupationLevel1')).toEqual(['IT']);
        // versjon
        expect(parsed.searchParams.get('v')).toBe('5');
    });

    it('enkoder mellomrom i yrkeskategorier', () => {
        const url = opprettLinkTilArbeidsplassen({ ...mockStedSoek, styrk08: ['3332', '3434', '5131', '7512'] });
        // Rå substring for første kategori skal bruke + for mellomrom
        expect(url).toContain('occupationLevel1=Reiseliv+og+mat');
    });

    it('håndterer søk uten fylker', () => {
        const url = opprettLinkTilArbeidsplassen(stedSoekUtenFylker);
        expect(url).toBe('https://arbeidsplassen.nav.no/stillinger?v=5&occupationLevel1=IT');
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
    it('mapper yrkes-underkategorier', () => {
        const url = opprettLinkTilArbeidsplassen({ ...stedSoekUtenFylker, styrk08: ['2166', '3514'] });
        expect(url).toBe(
            'https://arbeidsplassen.nav.no/stillinger?v=5&occupationLevel1=IT&occupationLevel2=IT.Interaksjonsdesign&occupationLevel2=IT.Drift%2C+vedlikehold',
        );
    });
});
