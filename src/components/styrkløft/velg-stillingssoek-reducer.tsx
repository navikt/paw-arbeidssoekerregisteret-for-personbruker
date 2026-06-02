export type VelgStillingssoekState = {
    fylker: {
        verdi: string[];
        visFeilmelding: boolean;
    };
    yrkeskategorier: {
        verdi: string[];
        visFeilmelding: boolean;
    };
    visStillingerUtenKrav: boolean;
    harSendtInnSkjema: boolean;
};

type InitState = {
    fylker: string[];
    yrkeskategorier: string[];
    visStillingerUtenKrav: boolean;
};
export type VelgStillingssoekAction =
    | { type: 'SETT_FYLKER'; payload: string[] }
    | { type: 'SETT_YRKESKATEGORIER'; payload: string[] }
    | { type: 'SETT_VIS_STILLINGER_UTEN_KRAV'; payload: boolean }
    | { type: 'SETT_HAR_SENDT_INN_SKJEMA'; payload: boolean };

export function initialVelgStillingssoekState(state: InitState): VelgStillingssoekState {
    const { fylker, yrkeskategorier, visStillingerUtenKrav } = state;
    return {
        fylker: {
            verdi: fylker,
            visFeilmelding: false,
        },
        yrkeskategorier: {
            verdi: yrkeskategorier,
            visFeilmelding: false,
        },
        visStillingerUtenKrav,
        harSendtInnSkjema: false,
    };
}

export function velgStillingssoekReducer(state: VelgStillingssoekState, action: VelgStillingssoekAction) {
    switch (action.type) {
        case 'SETT_FYLKER':
            return {
                ...state,
                fylker: {
                    verdi: action.payload,
                    visFeilmelding: state.harSendtInnSkjema && action.payload.length === 0,
                },
            };
        case 'SETT_YRKESKATEGORIER':
            return {
                ...state,
                yrkeskategorier: {
                    verdi: action.payload,
                    visFeilmelding: state.harSendtInnSkjema && action.payload.length === 0,
                },
            };
        case 'SETT_VIS_STILLINGER_UTEN_KRAV':
            return {
                ...state,
                visStillingerUtenKrav: action.payload,
                fylker: {
                    ...state.fylker,
                    visFeilmelding: state.harSendtInnSkjema && !action.payload && state.fylker.verdi.length === 0,
                },
                yrkeskategorier: {
                    ...state.yrkeskategorier,
                    visFeilmelding:
                        state.harSendtInnSkjema && !action.payload && state.yrkeskategorier.verdi.length === 0,
                },
            };
        case 'SETT_HAR_SENDT_INN_SKJEMA':
            return {
                ...state,
                fylker: {
                    ...state.fylker,
                    visFeilmelding: action.payload && state.fylker.verdi.length === 0 && !state.visStillingerUtenKrav,
                },
                yrkeskategorier: {
                    ...state.yrkeskategorier,
                    visFeilmelding:
                        action.payload && state.yrkeskategorier.verdi.length === 0 && !state.visStillingerUtenKrav,
                },
                harSendtInnSkjema: action.payload,
            };
        default:
            return state;
    }
}
