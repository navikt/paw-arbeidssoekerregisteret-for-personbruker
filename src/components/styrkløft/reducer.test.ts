import { describe, expect, it } from 'vitest';
import { initialStyrkState, reducer, StyrkState } from './reducer';
import { Brukerprofil } from '@/model/brukerprofil';

const inaktivBruker: Brukerprofil = {
    identitetsnummer: '42',
    tjenestestatus: 'INAKTIV',
};

const aktivBrukerUtenSoek: Brukerprofil = {
    identitetsnummer: '42',
    tjenestestatus: 'AKTIV',
    stillingssoek: [],
};

const aktivBrukerMedSoek: Brukerprofil = {
    identitetsnummer: '42',
    tjenestestatus: 'AKTIV',
    stillingssoek: [
        {
            soekType: 'STED_SOEK_V1',
            soekeord: [],
            fylker: [],
            styrk08: [],
        },
    ],
};

describe('initialStyrkState', () => {
    it('setter visEndreSok til false for INAKTIV bruker', () => {
        const state = initialStyrkState(inaktivBruker);
        expect(state.visEndreSok).toBe(false);
    });

    it('setter visEndreSok til true for AKTIV bruker uten stillingssoek', () => {
        const state = initialStyrkState(aktivBrukerUtenSoek);
        expect(state.visEndreSok).toBe(true);
    });

    it('setter visEndreSok til false for AKTIV bruker med eksisterende søk', () => {
        const state = initialStyrkState(aktivBrukerMedSoek);
        expect(state.visEndreSok).toBe(false);
    });

    it('setter standard init-verdier uavhengig av brukerprofil', () => {
        const state = initialStyrkState(inaktivBruker);
        expect(state.submittedTjenestestatus).toBeNull();
        expect(state.visAvsluttModal).toBe(false);
        expect(state.brukerprofil).toBe(inaktivBruker);
    });
});

describe('reducer', () => {
    const baseState: StyrkState = initialStyrkState(aktivBrukerUtenSoek);

    describe('SUBMITTED_TJENESTESTATUS', () => {
        it('setter submittedTjenestestatus og visEndreSok=true ved AKTIV uten søk', () => {
            const state = reducer(baseState, { type: 'SUBMITTED_TJENESTESTATUS', payload: 'AKTIV' });
            expect(state.submittedTjenestestatus).toBe('AKTIV');
            expect(state.visEndreSok).toBe(true);
        });

        it('setter submittedTjenestestatus og visEndreSok=false ved INAKTIV', () => {
            const state = reducer(baseState, { type: 'SUBMITTED_TJENESTESTATUS', payload: 'INAKTIV' });
            expect(state.submittedTjenestestatus).toBe('INAKTIV');
            expect(state.visEndreSok).toBe(false);
        });
    });

    describe('VIS_ENDRE_SOK', () => {
        it('setter visEndreSok til true', () => {
            const state = reducer({ ...baseState, visEndreSok: false }, { type: 'VIS_ENDRE_SOK', payload: true });
            expect(state.visEndreSok).toBe(true);
        });

        it('setter visEndreSok til false', () => {
            const state = reducer({ ...baseState, visEndreSok: true }, { type: 'VIS_ENDRE_SOK', payload: false });
            expect(state.visEndreSok).toBe(false);
        });
    });

    describe('VIS_AVSLUTT_MODAL', () => {
        it('setter visAvsluttModal til true', () => {
            const state = reducer(baseState, { type: 'VIS_AVSLUTT_MODAL', payload: true });
            expect(state.visAvsluttModal).toBe(true);
        });

        it('setter visAvsluttModal til false', () => {
            const stateWithModal: StyrkState = { ...baseState, visAvsluttModal: true };
            const state = reducer(stateWithModal, { type: 'VIS_AVSLUTT_MODAL', payload: false });
            expect(state.visAvsluttModal).toBe(false);
        });
    });

    describe('LAGRER_SOEK', () => {
        it('oppdaterer brukerprofil.stillingssoek', () => {
            const state = reducer(baseState, {
                type: 'LAGRER_SOEK',
                payload: { fylker: [], yrkeskategorier: [] },
            });
            expect(state.brukerprofil.stillingssoek).toBeDefined();
            expect(Array.isArray(state.brukerprofil.stillingssoek)).toBe(true);
        });
    });
});
