import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Brukerprofil, Tjenestestatus } from '@/model/brukerprofil';
import AktivBrukerStateless from '@/components/styrkløft/aktiv-bruker-stateless';
import { useState } from 'react';
import { hentYrkeskategorier } from '@/lib/hent-yrkeskategorier';
import useOnSubmitTjenestestatus from '@/components/styrkløft/useOnSubmitTjenestestatus';

export interface AktivBrukerProps {
    onSubmitTjenestestatus(status: Tjenestestatus): Promise<void>;
    onSubmitStillingsSoek(data: any): Promise<void>;
    useOnFetchStillinger(): { data?: any; error?: Error };
    brukerprofil: Brukerprofil;
    sprak: Sprak;
}

function initLagretSok(brukerprofil: Brukerprofil) {
    const lagretSoek = (brukerprofil?.stillingssoek ?? []).find((s) => s.soekType === 'STED_SOEK_V1');
    const fylker = (lagretSoek?.fylker ?? []).map((f) => f.navn);
    const yrkeskategorier = hentYrkeskategorier(lagretSoek?.styrk08 ?? []);
    return { fylker, yrkeskategorier };
}

function AktivBruker(props: AktivBrukerProps) {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [lagretSok, settLagretSok] = useState<{ fylker: string[]; yrkeskategorier: string[] }>(
        initLagretSok(props.brukerprofil),
    );
    const [visAvmeldModal, settVisAvmeldModal] = useState<boolean>(false);

    const onSubmitStillingssoek = async (data: any) => {
        await props.onSubmitStillingsSoek(data);
        settLagretSok(data);
        setIsEditMode(false);
    };

    const onEditSearch = () => setIsEditMode(true);
    const onCancelEditSearch = () => setIsEditMode(false);
    const { onSubmitTjenestestatus, submittedTjenestestatus, pendingTjenestestatus, errorTjenestestatus } =
        useOnSubmitTjenestestatus(props.onSubmitTjenestestatus);

    return (
        <AktivBrukerStateless
            {...props}
            isEditMode={isEditMode}
            visAvmeldModal={visAvmeldModal}
            onEditSearch={onEditSearch}
            onSubmitStillingsSoek={onSubmitStillingssoek}
            lagretSok={lagretSok}
            onCancelEditSearch={onCancelEditSearch}
            onVisAvmeldModal={(val: boolean) => settVisAvmeldModal(val)}
            onSubmitTjenestestatus={onSubmitTjenestestatus}
            submittedTjenestestatus={submittedTjenestestatus}
            pendingTjenestestatus={pendingTjenestestatus}
            errorTjenestestatus={errorTjenestestatus}
        />
    );
}

export default AktivBruker;
