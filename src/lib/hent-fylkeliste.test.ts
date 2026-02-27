import { byggFylkerMedKommunerPayload, hentFylkeliste } from './hent-fylkeliste';
import { Fylke } from '../model/brukerprofil';

describe('hentFylkeliste', () => {
    it('Når vi ikke har fylker, skal vi få tom liste', () => {
        expect(hentFylkeliste([])).toEqual([]);
    });

    it('Skal returnere alle fylker i riktig format', () => {
        const fylker = ['Oslo', 'Akershus', 'Vestland'];
        const expectedFylker: Fylke[] = [
            { navn: 'Oslo', kommuner: [], fylkesnummer: '03' },
            { navn: 'Akershus', kommuner: [], fylkesnummer: '32' },
            { navn: 'Vestland', kommuner: [], fylkesnummer: '46' },
        ];
        expect(hentFylkeliste(fylker)).toEqual(expectedFylker);
    });
    it('Skal fjerne ugyldige fylker', () => {
        const fylker = ['Oslo', 'Akershus', 'Vestland', 'UgyldigFylke'];
        const expectedFylker: Fylke[] = [
            { navn: 'Oslo', kommuner: [], fylkesnummer: '03' },
            { navn: 'Akershus', kommuner: [], fylkesnummer: '32' },
            { navn: 'Vestland', kommuner: [], fylkesnummer: '46' },
        ];
        expect(hentFylkeliste(fylker)).toEqual(expectedFylker);
    });
    it('Skal håndtere duplikater', () => {
        const fylker = ['Oslo', 'Akershus', 'Vestland', 'Oslo'];
        const expectedFylker: Fylke[] = [
            { navn: 'Oslo', kommuner: [], fylkesnummer: '03' },
            { navn: 'Akershus', kommuner: [], fylkesnummer: '32' },
            { navn: 'Vestland', kommuner: [], fylkesnummer: '46' },
        ];
        expect(hentFylkeliste(fylker)).toEqual(expectedFylker);
    });
    it('Skal håndtere null og undefined input', () => {
        expect(hentFylkeliste(null as any)).toEqual([]);
        expect(hentFylkeliste(undefined as any)).toEqual([]);
    });

    it('Skal filtrere bort tomme strenger og whitespace', () => {
        const fylker = ['Oslo', '', '  ', 'Akershus', null as any, undefined as any];
        const expectedFylker: Fylke[] = [
            { navn: 'Oslo', kommuner: [], fylkesnummer: '03' },
            { navn: 'Akershus', kommuner: [], fylkesnummer: '32' },
        ];
        expect(hentFylkeliste(fylker)).toEqual(expectedFylker);
    });

    it('Skal håndtere case-insensitive matching', () => {
        const fylker = ['OSLO', 'akershus', 'VeStLaNd'];
        const expectedFylker: Fylke[] = [
            { navn: 'Oslo', kommuner: [], fylkesnummer: '03' },
            { navn: 'Akershus', kommuner: [], fylkesnummer: '32' },
            { navn: 'Vestland', kommuner: [], fylkesnummer: '46' },
        ];
        expect(hentFylkeliste(fylker)).toEqual(expectedFylker);
    });
});

describe('byggFylkerMedKommunerPayload', () => {
    it('returnerer som vanlig for fylker', () => {
        const fylker = ['Oslo', 'Akershus'];
        const expectedFylker: Fylke[] = [
            { navn: 'Oslo', kommuner: [], fylkesnummer: '03' },
            { navn: 'Akershus', kommuner: [], fylkesnummer: '32' },
        ];
        expect(byggFylkerMedKommunerPayload(fylker)).toEqual(expectedFylker);
    });

    it('returnerer ´fylker med kommuner der det er valg', () => {
        expect(byggFylkerMedKommunerPayload(['Oslo', 'Fredrikstad', 'Moss', 'Tønsberg'])).toEqual([
            { navn: 'Oslo', kommuner: [], fylkesnummer: '03' },
            {
                fylkesnummer: '31',
                kommuner: [
                    {
                        kommunenummer: '3107',
                        navn: 'Fredrikstad',
                    },
                    {
                        kommunenummer: '3103',
                        navn: 'Moss',
                    },
                ],
                navn: 'Østfold',
            },
            {
                fylkesnummer: '39',
                kommuner: [
                    {
                        kommunenummer: '3905',
                        navn: 'Tønsberg',
                    },
                ],
                navn: 'Vestfold',
            },
        ]);
    });

    it('mapper om alle kommuner til fylke uten kommuner', () => {
        expect(
            byggFylkerMedKommunerPayload([
                'Eigersund',
                'Stavanger',
                'Haugesund',
                'Sandnes',
                'Sokndal',
                'Lund',
                'Bjerkreim',
                'Hå',
                'Klepp',
                'Time',
                'Gjesdal',
                'Sola',
                'Randaberg',
                'Strand',
                'Hjelmeland',
                'Suldal',
                'Sauda',
                'Kvitsøy',
                'Bokn',
                'Tysvær',
                'Karmøy',
                'Utsira',
                'Vindafjord',
            ]),
        ).toEqual([{ navn: 'Rogaland', kommuner: [], fylkesnummer: '11' }]);
    });
});
