import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Brukerprofil, Stillingssoek, Tjenestestatus } from '@/model/brukerprofil';
import AktivBrukerStateless from '@/components/styrkløft/aktiv-bruker-stateless';
import { useState } from 'react';

export interface AktivBrukerProps {
    onSubmitTjenestestatus(status: Tjenestestatus): Promise<void>;
    onSubmitStillingsSoek(data: any): Promise<void>;
    onFetchStillinger(): Promise<{ data?: any; error?: Error }>;
    brukerprofil: Brukerprofil;
    sprak: Sprak;
}

function AktivBruker(props: AktivBrukerProps) {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const onSubmitStillingssoek = async (data: any) => {
        await props.onSubmitStillingsSoek(data);
        setIsEditMode(false);
    };

    const onEditSearch = () => setIsEditMode(true);

    return (
        <AktivBrukerStateless
            {...props}
            isEditMode={isEditMode}
            visAvmeldModal={false}
            onEditSearch={onEditSearch}
            onSubmitStillingsSoek={onSubmitStillingssoek}
        />
    );
}

export default AktivBruker;
