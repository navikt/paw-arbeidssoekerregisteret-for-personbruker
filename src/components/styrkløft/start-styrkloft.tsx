import { Tjenestestatus } from '@/model/brukerprofil';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { StartStyrkloftStateless } from '@/components/styrkløft/start-styrkloft-stateless';
import useOnSubmitTjenestestatus from '@/components/styrkløft/useOnSubmitTjenestestatus';

interface Props {
    onSubmitTjenestestatus(status: Tjenestestatus): Promise<void>;
    sprak: Sprak;
}

function StartStyrkloft(props: Props) {
    const { onSubmitTjenestestatus, pendingTjenestestatus, errorTjenestestatus } = useOnSubmitTjenestestatus(
        props.onSubmitTjenestestatus,
    );

    return (
        <StartStyrkloftStateless
            onSubmitTjenestestatus={onSubmitTjenestestatus}
            sprak={props.sprak}
            pendingTjenestestatus={pendingTjenestestatus}
            errorTjenestestatus={errorTjenestestatus}
        />
    );
}

export default StartStyrkloft;
