import { Brukerprofil, Tjenestestatus } from '@/model/brukerprofil';
import LedigeStillinger from '@/components/styrkløft/ledige-stillinger';
import StartStyrkloft from '@/components/styrkløft/start-styrkloft';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { useState } from 'react';

interface Props {
    brukerprofil: Brukerprofil;
    onSubmitTjenestestatus(status: Tjenestestatus): Promise<void>;
    onSubmitStillingsSoek(data: any): Promise<void>;
    onFetchStillinger(): Promise<{ data?: any; error?: Error }>;
    sprak: Sprak;
    isStorybook?: boolean;
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
        return <LedigeStillinger fetchData={props.onFetchStillinger} isStorybook={props.isStorybook} />;
    } else if (visStartKomponent) {
        return <StartStyrkloft {...props} />;
    }
}

function StyrkLoft(props: Props) {
    const { brukerprofil, sprak, onSubmitTjenestestatus, onFetchStillinger, isStorybook } = props;
    const [harLagretSoek, settHarLagretSoek] = useState(false);

    const erAvmeldt = brukerprofil.tjenestestatus === 'OPT_OUT';
    const visStartKomponent =
        brukerprofil.tjenestestatus === 'INAKTIV' || (brukerprofil.stillingssoek ?? []).length === 0;
    const visStillinger = brukerprofil.tjenestestatus === 'AKTIV' && (brukerprofil.stillingssoek ?? []).length > 0;

    const onSubmitStillingsSoek = async (data: any) => {
        try {
            await props.onSubmitStillingsSoek(data);
            settHarLagretSoek(true);
        } catch (err: any) {
            console.error(err);
        }
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
            isStorybook={isStorybook}
        />
    );
}

export default StyrkLoft;
