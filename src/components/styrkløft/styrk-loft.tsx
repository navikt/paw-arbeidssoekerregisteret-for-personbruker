import { Brukerprofil, Tjenestestatus } from '@/model/brukerprofil';
import StartStyrkloft from '@/components/styrkløft/start-styrkloft';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { useState } from 'react';
import AktivBruker from '@/components/styrkløft/aktiv-bruker';

interface Props {
    brukerprofil: Brukerprofil;
    onSubmitTjenestestatus(status: Tjenestestatus): Promise<void>;
    onSubmitStillingsSoek(data: any): Promise<void>;
    onFetchStillinger(): Promise<{ data?: any; error?: Error }>;
    sprak: Sprak;
}

interface StatelessProps extends Props {
    visStartKomponent: boolean;
    visStillinger: boolean;
    erAvmeldt: boolean;
}

function StyrkLoftStateless(props: StatelessProps) {
    const { visStartKomponent, visStillinger, erAvmeldt } = props;

    if (erAvmeldt) {
        return null;
    } else if (visStillinger) {
        return <AktivBruker {...props} />;
    } else if (visStartKomponent) {
        return <StartStyrkloft {...props} />;
    }
}

function StyrkLoft(props: Props) {
    const { brukerprofil, sprak, onSubmitTjenestestatus, onFetchStillinger } = props;
    const [harLagretSoek, settHarLagretSoek] = useState(false);

    const erAvmeldt = brukerprofil.tjenestestatus === 'OPT_OUT' || brukerprofil.tjenestestatus === 'KAN_IKKE_LEVERES';
    const visStartKomponent =
        brukerprofil.tjenestestatus === 'INAKTIV' || (brukerprofil.stillingssoek ?? []).length === 0;
    const visStillinger = brukerprofil.tjenestestatus === 'AKTIV' && (brukerprofil.stillingssoek ?? []).length > 0;

    const onSubmitStillingsSoek = async (data: any) => {
        await props.onSubmitStillingsSoek(data);
        settHarLagretSoek(true);
    };

    return (
        <StyrkLoftStateless
            erAvmeldt={erAvmeldt}
            visStartKomponent={visStartKomponent}
            visStillinger={visStillinger || harLagretSoek}
            brukerprofil={brukerprofil}
            onSubmitTjenestestatus={onSubmitTjenestestatus}
            onSubmitStillingsSoek={onSubmitStillingsSoek}
            onFetchStillinger={onFetchStillinger}
            sprak={sprak}
        />
    );
}

export default StyrkLoft;
