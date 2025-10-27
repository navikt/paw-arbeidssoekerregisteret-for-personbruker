import { Brukerprofil, Tjenestestatus } from '@/model/brukerprofil';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { useState } from 'react';
import { StartStyrkloftStateless } from '@/components/styrkløft/start-styrkloft-stateless';

interface Props {
    brukerprofil: Brukerprofil;
    onSubmitTjenestestatus(status: Tjenestestatus): Promise<void>;
    onSubmitStillingsSoek(data: any): Promise<void>;
    sprak: Sprak;
}

function StartStyrkloft(props: Props) {
    const { brukerprofil } = props;
    const [pendingTjenestestatus, setPendingTjenestestatus] = useState<Tjenestestatus | null>(null);
    const [errorTjenestestatus, setErrorTjenestestatus] = useState<string | null>(null);
    const [submittedTjenestestatus, setSubmittedTjenestestatus] = useState<Tjenestestatus | null>(null);

    const onSubmitTjenestestatus = async (status: Tjenestestatus) => {
        try {
            setPendingTjenestestatus(status);
            setErrorTjenestestatus(null);
            await props.onSubmitTjenestestatus(status);
            setSubmittedTjenestestatus(status);
        } catch (err: any) {
            setErrorTjenestestatus(err.message);
        } finally {
            setPendingTjenestestatus(null);
        }
    };

    return (
        <div className={'mb-4'}>
            <StartStyrkloftStateless
                onSubmitTjenestestatus={onSubmitTjenestestatus}
                onSubmitStillingsSoek={props.onSubmitStillingsSoek}
                visGodkjennEksperiment={submittedTjenestestatus === null}
                visVelgFiltere={submittedTjenestestatus === 'AKTIV' || brukerprofil.tjenestestatus === 'AKTIV'}
                visAvmeldtKvittering={submittedTjenestestatus === 'OPT_OUT'}
                sprak={props.sprak}
                pendingTjenestestatus={pendingTjenestestatus}
                errorTjenestestatus={errorTjenestestatus}
            />
        </div>
    );
}

export default StartStyrkloft;
