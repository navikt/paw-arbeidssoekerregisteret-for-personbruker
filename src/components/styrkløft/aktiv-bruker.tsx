import type { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { useState } from 'react';
import AktivBrukerStateless from '@/components/styrkløft/aktiv-bruker-stateless';
import type { StyrkState } from '@/components/styrkløft/reducer';
import useOnSubmitTjenestestatus from '@/components/styrkløft/useOnSubmitTjenestestatus';
import { hentFylkerUnderkategorier } from '@/lib/hent-fylkeliste';
import { hentYrkeUnderkategorier } from '@/lib/hent-yrkeskategorier';
import type { Brukerprofil, Tjenestestatus } from '@/model/brukerprofil';
import type { StillingsSoekPayload } from '@/model/stillings-soek';

export interface AktivBrukerProps {
    onSubmitTjenestestatus(status: Tjenestestatus): Promise<void>;

    onSubmitStillingsSoek(data: any): Promise<void>;

    useOnFetchStillinger(): { data?: any; error?: Error };

    onSettEndreSok(payload: boolean): void;

    onVisAvmeldModal(payload: boolean): void;

    state: StyrkState;
    sprak: Sprak;
}

function initLagretSok(brukerprofil: Brukerprofil): StillingsSoekPayload {
    console.log('brukerprofil', brukerprofil);
    const lagretSoek = (brukerprofil?.stillingssoek ?? []).find((s) => s.soekType === 'STED_SOEK_V1');
    const fylker = hentFylkerUnderkategorier(lagretSoek?.fylker ?? []);
    const yrkeskategorier = hentYrkeUnderkategorier(lagretSoek?.styrk08 ?? []);
    const soekeTags = lagretSoek?.soekeTags ?? [];
    const visStillingerUtenKrav =
        soekeTags.includes('INGEN_KRAV_TIL_ARBEIDSERFARING_V1') || soekeTags.includes('INGEN_KRAV_TIL_UTDANNING_V1');
    return { fylker, yrkeskategorier, visStillingerUtenKrav };
}

function AktivBruker(props: AktivBrukerProps) {
    const { state, onSettEndreSok, onVisAvmeldModal } = props;
    const [lagretSok, settLagretSok] = useState<StillingsSoekPayload>(initLagretSok(state.brukerprofil));

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
