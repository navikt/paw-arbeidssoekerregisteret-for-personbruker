import type { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { ActionDispatch, useState } from 'react';
import AktivBrukerStateless from '@/components/styrkløft/aktiv-bruker-stateless';
import { StyrkAction, type StyrkState } from '@/components/styrkløft/reducer';
import useOnSubmitTjenestestatus from '@/components/styrkløft/useOnSubmitTjenestestatus';
import { hentFylkerUnderkategorier } from '@/lib/hent-fylkeliste';
import { hentYrkeUnderkategorier } from '@/lib/hent-yrkeskategorier';
import type { Brukerprofil, Tjenestestatus } from '@/model/brukerprofil';

export interface AktivBrukerProps {
    onSubmitTjenestestatus(status: Tjenestestatus): Promise<void>;
    onSubmitStillingsSoek(data: any): Promise<void>;
    useOnFetchStillinger(): { data?: any; error?: Error };
    onSettEndreSok(payload: boolean): void;
    onVisAvmeldModal(payload: boolean): void;
    state: StyrkState;
    sprak: Sprak;
}

function initLagretSok(brukerprofil: Brukerprofil) {
    const lagretSoek = (brukerprofil?.stillingssoek ?? []).find((s) => s.soekType === 'STED_SOEK_V1');
    const fylker = hentFylkerUnderkategorier(lagretSoek?.fylker ?? []);
    const yrkeskategorier = hentYrkeUnderkategorier(lagretSoek?.styrk08 ?? []);
    return { fylker, yrkeskategorier };
}

function AktivBruker(props: AktivBrukerProps) {
    const { state, onSettEndreSok, onVisAvmeldModal } = props;
    const [lagretSok, settLagretSok] = useState<{ fylker: string[]; yrkeskategorier: string[] }>(
        initLagretSok(state.brukerprofil),
    );

    const onSubmitStillingssoek = async (data: any) => {
        await props.onSubmitStillingsSoek(data);
        settLagretSok(data);
        onSettEndreSok(false);
    };

    const onEditSearch = () => onSettEndreSok(true);
    const onCancelEditSearch = () => onSettEndreSok(false);

    const { onSubmitTjenestestatus, submittedTjenestestatus, pendingTjenestestatus, errorTjenestestatus } =
        useOnSubmitTjenestestatus(props.onSubmitTjenestestatus);
    const kanAvbryteEndreSok = (state.brukerprofil.stillingssoek || []).length > 0;

    return (
        <AktivBrukerStateless
            sprak={props.sprak}
            useOnFetchStillinger={props.useOnFetchStillinger}
            visEndreSok={state.visEndreSok}
            visAvmeldModal={state.visAvsluttModal}
            onEditSearch={onEditSearch}
            onSubmitStillingsSoek={onSubmitStillingssoek}
            lagretSok={lagretSok}
            onCancelEditSearch={kanAvbryteEndreSok ? onCancelEditSearch : undefined}
            onVisAvmeldModal={onVisAvmeldModal}
            onSubmitTjenestestatus={onSubmitTjenestestatus}
            submittedTjenestestatus={submittedTjenestestatus}
            pendingTjenestestatus={pendingTjenestestatus}
            errorTjenestestatus={errorTjenestestatus}
            brukerprofil={state.brukerprofil}
        />
    );
}

export default AktivBruker;
