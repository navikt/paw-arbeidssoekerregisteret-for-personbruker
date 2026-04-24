import { Brukerprofil, Tjenestestatus } from '@/model/brukerprofil';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { StartStyrkloftStateless } from '@/components/styrkløft/start-styrkloft-stateless';
import useOnSubmitTjenestestatus from '@/components/styrkløft/useOnSubmitTjenestestatus';

interface Props {
    brukerprofil: Brukerprofil;
    onSubmitTjenestestatus(status: Tjenestestatus): Promise<void>;
    onSubmitStillingsSoek(data: any): Promise<void>;
    onRefreshServerComponent: () => void;
    sprak: Sprak;
}

function StartStyrkloft(props: Props) {
    const { brukerprofil } = props;
    const { onSubmitTjenestestatus, submittedTjenestestatus, pendingTjenestestatus, errorTjenestestatus } =
        useOnSubmitTjenestestatus(props.onSubmitTjenestestatus);

    const onSubmit = async (status: Tjenestestatus) => {
        await onSubmitTjenestestatus(status);
        if (status === 'AKTIV') {
            props.onRefreshServerComponent();
        }
    };

    return (
        <StartStyrkloftStateless
            onSubmitTjenestestatus={onSubmit}
            onSubmitStillingsSoek={props.onSubmitStillingsSoek}
            visGodkjennEksperiment={submittedTjenestestatus === null}
            visVelgFiltere={submittedTjenestestatus === 'AKTIV' || brukerprofil.tjenestestatus === 'AKTIV'}
            visAvmeldtKvittering={submittedTjenestestatus === 'OPT_OUT'}
            sprak={props.sprak}
            pendingTjenestestatus={pendingTjenestestatus}
            errorTjenestestatus={errorTjenestestatus}
        />
    );
}

export default StartStyrkloft;
