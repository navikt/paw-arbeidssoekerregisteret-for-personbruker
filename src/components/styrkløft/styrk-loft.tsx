'use client';

import { Brukerprofil, Tjenestestatus } from '@/model/brukerprofil';
import StartStyrkloft from '@/components/styrkløft/start-styrkloft';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { ActionDispatch } from 'react';
import AktivBruker from '@/components/styrkløft/aktiv-bruker';
import Avmeldt from '@/components/styrkløft/avmeldt';
import { StyrkAction, StyrkState } from '@/components/styrkløft/reducer';
import { KvitteringAvmeldt } from '@/components/styrkløft/kvittering-avmeldt';

interface onSubmitStillingsSoekPayload {
    fylker: string[];
    yrkeskategorier: string[];
}

interface Props {
    brukerprofil: Brukerprofil;
    onSubmitTjenestestatus(status: Tjenestestatus): Promise<void>;
    onSubmitStillingsSoek(data: onSubmitStillingsSoekPayload): Promise<void>;
    useOnFetchStillinger(): { data?: any; error?: Error };
    state: StyrkState;
    dispatch: ActionDispatch<[StyrkAction]>;
    sprak: Sprak;
}

interface StatelessProps extends Omit<Props, 'dispatch'> {
    visStartKomponent: boolean;
    visKvitteringAvmeldt: boolean;
    visAktiv: boolean;
    visAvmeldt: boolean;
    onSettEndreSok(payload: boolean): void;
    onVisAvmeldModal(payload: boolean): void;
}

function StyrkLoftStateless(props: StatelessProps) {
    const { visStartKomponent, visAktiv, visAvmeldt, visKvitteringAvmeldt } = props;

    if (visStartKomponent) {
        return <StartStyrkloft {...props} />;
    } else if (visKvitteringAvmeldt) {
        return <KvitteringAvmeldt sprak={props.sprak} />;
    } else if (visAvmeldt) {
        return <Avmeldt {...props} />;
    } else if (visAktiv) {
        return <AktivBruker {...props} />;
    }

    return null;
}

function StyrkLoft(props: Props) {
    const { sprak, useOnFetchStillinger, state, dispatch } = props;
    const brukerprofil = state.brukerprofil;
    const visStartKomponent = brukerprofil.tjenestestatus === 'INAKTIV' && state.submittedTjenestestatus === null;
    const visKvitteringAvmeldt = state.submittedTjenestestatus === 'OPT_OUT';
    const visAvmeldt = brukerprofil.tjenestestatus === 'OPT_OUT' || brukerprofil.tjenestestatus === 'KAN_IKKE_LEVERES';
    const visAktiv = brukerprofil.tjenestestatus === 'AKTIV' || state.submittedTjenestestatus === 'AKTIV';

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
            visAvmeldt={visAvmeldt}
            visStartKomponent={visStartKomponent}
            visAktiv={visAktiv}
            visKvitteringAvmeldt={visKvitteringAvmeldt}
            brukerprofil={brukerprofil}
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
