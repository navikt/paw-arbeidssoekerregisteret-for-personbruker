import { describe, expect, it } from 'vitest';
import type { Brukerprofil } from '@/model/brukerprofil';
import type { StyrkState } from './reducer';
import { hentVisningsState } from './styrk-loft';

function lagState(
    tjenestestatus: Brukerprofil['tjenestestatus'],
    submittedTjenestestatus: StyrkState['submittedTjenestestatus'] = null,
): StyrkState {
    return {
        brukerprofil: { identitetsnummer: '42', tjenestestatus },
        submittedTjenestestatus,
        visEndreSok: false,
        visAvsluttModal: false,
    };
}

describe('hentVisningsState', () => {
    describe('visStartKomponent', () => {
        it('er true for INAKTIV bruker uten submitted status', () => {
            expect(hentVisningsState(lagState('INAKTIV')).visStartKomponent).toBe(true);
        });

        it('er false når submittedTjenestestatus er satt', () => {
            expect(hentVisningsState(lagState('INAKTIV', 'AKTIV')).visStartKomponent).toBe(false);
        });

        it('er false for AKTIV bruker', () => {
            expect(hentVisningsState(lagState('AKTIV')).visStartKomponent).toBe(false);
        });

        it('er false for OPT_OUT bruker', () => {
            expect(hentVisningsState(lagState('OPT_OUT')).visStartKomponent).toBe(false);
        });
    });

    describe('visKvitteringAvmeldt', () => {
        it('er true når submittedTjenestestatus er OPT_OUT', () => {
            expect(hentVisningsState(lagState('INAKTIV', 'OPT_OUT')).visKvitteringAvmeldt).toBe(true);
        });

        it('er true uavhengig av brukerprofilstatus', () => {
            expect(hentVisningsState(lagState('AKTIV', 'OPT_OUT')).visKvitteringAvmeldt).toBe(true);
        });

        it('er false når submittedTjenestestatus er null', () => {
            expect(hentVisningsState(lagState('INAKTIV')).visKvitteringAvmeldt).toBe(false);
        });

        it('er false når submittedTjenestestatus er AKTIV', () => {
            expect(hentVisningsState(lagState('INAKTIV', 'AKTIV')).visKvitteringAvmeldt).toBe(false);
        });
    });

    describe('visAvmeldt', () => {
        it('er true for OPT_OUT bruker uten submitted status', () => {
            expect(hentVisningsState(lagState('OPT_OUT')).visAvmeldt).toBe(true);
        });

        it('er false når submittedTjenestestatus er satt (selv om bruker er OPT_OUT)', () => {
            expect(hentVisningsState(lagState('OPT_OUT', 'AKTIV')).visAvmeldt).toBe(false);
        });
    });

    describe('visAktiv', () => {
        it('er true for AKTIV bruker uten submitted status', () => {
            expect(hentVisningsState(lagState('AKTIV')).visAktiv).toBe(true);
        });

        it('er true når submittedTjenestestatus er AKTIV', () => {
            expect(hentVisningsState(lagState('INAKTIV', 'AKTIV')).visAktiv).toBe(true);
        });

        it('er false for INAKTIV bruker uten submitted status', () => {
            expect(hentVisningsState(lagState('INAKTIV')).visAktiv).toBe(false);
        });

        it('er false for OPT_OUT bruker uten submitted status', () => {
            expect(hentVisningsState(lagState('OPT_OUT')).visAktiv).toBe(false);
        });
    });
});
