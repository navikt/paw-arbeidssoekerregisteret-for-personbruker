import { Brukerprofil, Tjenestestatus } from '@/model/brukerprofil';
import byggStillingssoekPayload from '@/lib/bygg-stillingssoek-payload';

export function initialStyrkState(brukerprofil: Brukerprofil): StyrkState {
    return {
        brukerprofil,
        submittedTjenestestatus: null,
        visAvsluttModal: false,
        visEndreSok: brukerprofil.tjenestestatus === 'AKTIV' && (brukerprofil.stillingssoek ?? []).length === 0,
    };
}

export function reducer(state: StyrkState, action: StyrkAction) {
    switch (action.type) {
        case 'SUBMITTED_TJENESTESTATUS': {
            return {
                ...state,
                submittedTjenestestatus: action.payload,
                visEndreSok: action.payload === 'AKTIV' && (state.brukerprofil.stillingssoek ?? []).length === 0,
            };
        }
        case 'VIS_ENDRE_SOK': {
            return { ...state, visEndreSok: action.payload };
        }
        case 'VIS_AVSLUTT_MODAL': {
            return { ...state, visAvsluttModal: action.payload };
        }
        case 'LAGRER_SOEK': {
            return {
                ...state,
                brukerprofil: {
                    ...state.brukerprofil,
                    stillingssoek: byggStillingssoekPayload(action.payload),
                },
            };
        }
        default:
            return state;
    }
}

export type StyrkState = {
    brukerprofil: Brukerprofil;
    submittedTjenestestatus: Tjenestestatus | null;
    visEndreSok: boolean;
    visAvsluttModal: boolean;
};

export type StyrkAction =
    | { type: 'SUBMITTED_TJENESTESTATUS'; payload: Tjenestestatus }
    | { type: 'VIS_ENDRE_SOK'; payload: boolean }
    | { type: 'VIS_AVSLUTT_MODAL'; payload: boolean }
    | { type: 'LAGRER_SOEK'; payload: any };
