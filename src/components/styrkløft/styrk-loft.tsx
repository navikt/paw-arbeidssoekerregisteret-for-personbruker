import { Brukerprofil, Tjenestestatus } from '@/model/brukerprofil';
import LedigeStillinger from '@/components/styrkløft/ledige-stillinger';
import StartStyrkloft from '@/components/styrkløft/start-styrkloft';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';

interface Props {
    brukerprofil: Brukerprofil;
    onSubmitTjenestestatus(status: Tjenestestatus): Promise<void>;
    onSubmitStillingsSoek(data: any): Promise<void>;
    onFetchStillinger(): Promise<{ data?: any; error?: Error }>;
    sprak: Sprak;
}

function StyrkLoftStatic(props: Props) {
    const { brukerprofil } = props;

    if (brukerprofil.tjenestestatus === 'OPT_OUT') {
        return null;
    }

    if (brukerprofil.tjenestestatus === 'INAKTIV' || (brukerprofil.stillingssoek ?? []).length === 0) {
        return <StartStyrkloft {...props} />;
    }

    if (brukerprofil.tjenestestatus === 'AKTIV' && (brukerprofil.stillingssoek ?? []).length > 0) {
        return <LedigeStillinger fetchData={props.onFetchStillinger} />;
    }
}

export default StyrkLoftStatic;
