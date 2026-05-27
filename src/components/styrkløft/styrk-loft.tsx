'use client';

import type { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import type { ActionDispatch } from 'react';
import AktivBruker from '@/components/styrkløft/aktiv-bruker';
import Avmeldt from '@/components/styrkløft/avmeldt';
import { KvitteringAvmeldt } from '@/components/styrkløft/kvittering-avmeldt';
import type { StyrkAction, StyrkState } from '@/components/styrkløft/reducer';
import StartStyrkloft from '@/components/styrkløft/start-styrkloft';
import type { Tjenestestatus } from '@/model/brukerprofil';

interface onSubmitStillingsSoekPayload {
    fylker: string[];
    yrkeskategorier: string[];
}

interface Props {
    onSubmitTjenestestatus(status: Tjenestestatus): Promise<void>;
    onSubmitStillingsSoek(data: onSubmitStillingsSoekPayload): Promise<void>;
    useOnFetchStillinger(): { data?: any; error?: Error };
    state: StyrkState;
    dispatch: ActionDispatch<[StyrkAction]>;
    sprak: Sprak;
}

interface StatelessProps extends Omit<Props, 'dispatch'> {
    onSettEndreSok(payload: boolean): void;
    onVisAvmeldModal(payload: boolean): void;
}

export function hentVisningsState(state: StyrkState) {
    const brukerprofil = state.brukerprofil;
    return {
        visStartKomponent: brukerprofil.tjenestestatus === 'INAKTIV' && state.submittedTjenestestatus === null,
        visKvitteringAvmeldt: state.submittedTjenestestatus === 'OPT_OUT',
        visAvmeldt: brukerprofil.tjenestestatus === 'OPT_OUT' && state.submittedTjenestestatus === null,
        visAktiv: brukerprofil.tjenestestatus === 'AKTIV' || state.submittedTjenestestatus === 'AKTIV',
    };
}

function StyrkLoftStateless(props: StatelessProps) {
    const { visStartKomponent, visAktiv, visAvmeldt, visKvitteringAvmeldt } = hentVisningsState(props.state);

    if (visStartKomponent) {
        return <StartStyrkloft {...props} />;
    } else if (visKvitteringAvmeldt) {
        return <KvitteringAvmeldt sprak={props.sprak} />;
    } else if (visAvmeldt) {
        return (
            <Avmeldt
                sprak={props.sprak}
                onSubmitTjenestestatus={props.onSubmitTjenestestatus}
                brukerprofil={props.state.brukerprofil}
            />
        );
    } else if (visAktiv) {
        return <AktivBruker {...props} />;
    }

    return null;
}

function StyrkLoft(props: Props) {
    const { sprak, useOnFetchStillinger, state, dispatch } = props;

    const onSubmitStillingsSoek = async (data: onSubmitStillingsSoekPayload) => {
        await props.onSubmitStillingsSoek(data);
        dispatch({ type: 'LAGRER_SOEK', payload: data });
    };

    const onSubmitTjenestestatus = async (status: Tjenestestatus) => {
        await props.onSubmitTjenestestatus(status);
        dispatch({ type: 'SUBMITTED_TJENESTESTATUS', payload: status });
    };

    const onSettEndreSok = (payload: boolean) => dispatch({ type: 'VIS_ENDRE_SOK', payload });
    const onVisAvmeldModal = (payload: boolean) => dispatch({ type: 'VIS_AVSLUTT_MODAL', payload });

    return (
        <StyrkLoftStateless
            onSubmitTjenestestatus={onSubmitTjenestestatus}
            onSubmitStillingsSoek={onSubmitStillingsSoek}
            useOnFetchStillinger={useOnFetchStillinger}
            sprak={sprak}
            state={state}
            onSettEndreSok={onSettEndreSok}
            onVisAvmeldModal={onVisAvmeldModal}
        />
    );
}

export default StyrkLoft;
