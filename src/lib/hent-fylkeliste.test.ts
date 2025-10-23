import { hentFylkeliste } from './hent-fylkeliste';
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
