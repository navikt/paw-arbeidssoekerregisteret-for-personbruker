import { describe, expect, it } from 'vitest';
import { initialVelgStillingssoekState, velgStillingssoekReducer } from './velg-stillingssoek-reducer';

describe('VelgStillingssoekReducer', () => {
    const initState = { fylker: [], yrkeskategorier: [], visStillingerUtenKrav: false };

    describe('SETT_FYLKER', () => {
        it('oppdaterer fylker i state', () => {
            expect(
                velgStillingssoekReducer(initialVelgStillingssoekState(initState), {
                    type: 'SETT_FYLKER',
                    payload: ['Oslo'],
                }).fylker,
            ).toEqual({ verdi: ['Oslo'], visFeilmelding: false });
        });

        it('setter visFeilmelding til true hvis fylker er tom', () => {
            const state = { ...initialVelgStillingssoekState(initState), harSendtInnSkjema: true };
            expect(velgStillingssoekReducer(state, { type: 'SETT_FYLKER', payload: [] }).fylker).toEqual({
                verdi: [],
                visFeilmelding: true,
            });
        });
    });

    describe('SETT_YRKESKATEGORIER', () => {
        it('oppdaterer yrkeskategorier i state', () => {
            expect(
                velgStillingssoekReducer(initialVelgStillingssoekState(initState), {
                    type: 'SETT_YRKESKATEGORIER',
                    payload: ['IT'],
                }).yrkeskategorier,
            ).toEqual({ verdi: ['IT'], visFeilmelding: false });
        });

        it('setter visFeilmelding til true hvis yrkeskategorier er tom', () => {
            const state = { ...initialVelgStillingssoekState(initState), harSendtInnSkjema: true };
            console.log(state);
            expect(
                velgStillingssoekReducer(state, {
                    type: 'SETT_YRKESKATEGORIER',
                    payload: [],
                }).yrkeskategorier,
            ).toEqual({ verdi: [], visFeilmelding: true });
        });
    });

    describe('SETT_VIS_STILLINGER_UTEN_KRAV', () => {
        it('oppdaterer visStillingerUtenKrav i state', () => {
            expect(
                velgStillingssoekReducer(initialVelgStillingssoekState(initState), {
                    type: 'SETT_VIS_STILLINGER_UTEN_KRAV',
                    payload: true,
                }).visStillingerUtenKrav,
            ).toBe(true);
        });

        it('oppdaterer visFeilmelding i fylker', () => {
            const state = { ...initialVelgStillingssoekState(initState), harSendtInnSkjema: true };
            expect(
                velgStillingssoekReducer(state, {
                    type: 'SETT_VIS_STILLINGER_UTEN_KRAV',
                    payload: true,
                }).fylker.visFeilmelding,
            ).toBe(false);

            expect(
                velgStillingssoekReducer(state, {
                    type: 'SETT_VIS_STILLINGER_UTEN_KRAV',
                    payload: false,
                }).fylker.visFeilmelding,
            ).toBe(true);
        });

        it('oppdaterer visFeilmelding i yrkeskategorier', () => {
            const state = { ...initialVelgStillingssoekState(initState), harSendtInnSkjema: true };
            expect(
                velgStillingssoekReducer(state, {
                    type: 'SETT_VIS_STILLINGER_UTEN_KRAV',
                    payload: true,
                }).yrkeskategorier.visFeilmelding,
            ).toBe(false);

            expect(
                velgStillingssoekReducer(state, {
                    type: 'SETT_VIS_STILLINGER_UTEN_KRAV',
                    payload: false,
                }).yrkeskategorier.visFeilmelding,
            ).toBe(true);
        });
    });

    describe('SETT_HAR_SENDT_INN_SKJEMA', () => {
        it('oppdaterer harSendtInnSkjema i state', () => {
            expect(
                velgStillingssoekReducer(initialVelgStillingssoekState(initState), {
                    type: 'SETT_HAR_SENDT_INN_SKJEMA',
                    payload: true,
                }).harSendtInnSkjema,
            ).toBe(true);
        });

        it('setter visFeilmelding for tomme fylker og ikke visStillingerUtenKrav', () => {
            expect(
                velgStillingssoekReducer(initialVelgStillingssoekState(initState), {
                    type: 'SETT_HAR_SENDT_INN_SKJEMA',
                    payload: true,
                }).fylker.visFeilmelding,
            ).toBe(true);
        });

        it('setter ikke visFeilmelding for tomme fylker og visStillingerUtenKrav', () => {
            const state = initialVelgStillingssoekState({ ...initState, visStillingerUtenKrav: true });
            expect(
                velgStillingssoekReducer(state, {
                    type: 'SETT_HAR_SENDT_INN_SKJEMA',
                    payload: true,
                }).fylker.visFeilmelding,
            ).toBe(false);
        });

        it('setter ikke visFeilmelding for fylker med verdi', () => {
            const state = initialVelgStillingssoekState({ ...initState, fylker: ['Oslo'] });
            expect(
                velgStillingssoekReducer(state, {
                    type: 'SETT_HAR_SENDT_INN_SKJEMA',
                    payload: true,
                }).fylker.visFeilmelding,
            ).toBe(false);
        });

        it('setter visFeilmelding for tomme yrkeskategorier og ikke visStillingerUtenKrav', () => {
            expect(
                velgStillingssoekReducer(initialVelgStillingssoekState(initState), {
                    type: 'SETT_HAR_SENDT_INN_SKJEMA',
                    payload: true,
                }).yrkeskategorier.visFeilmelding,
            ).toBe(true);
        });

        it('setter ikke visFeilmelding for tomme fylker og visStillingerUtenKrav', () => {
            const state = initialVelgStillingssoekState({ ...initState, visStillingerUtenKrav: true });
            expect(
                velgStillingssoekReducer(state, {
                    type: 'SETT_HAR_SENDT_INN_SKJEMA',
                    payload: true,
                }).yrkeskategorier.visFeilmelding,
            ).toBe(false);
        });

        it('setter ikke visFeilmelding for fylker med verdi', () => {
            const state = initialVelgStillingssoekState({ ...initState, yrkeskategorier: ['IT'] });
            expect(
                velgStillingssoekReducer(state, {
                    type: 'SETT_HAR_SENDT_INN_SKJEMA',
                    payload: true,
                }).yrkeskategorier.visFeilmelding,
            ).toBe(false);
        });
    });
});
