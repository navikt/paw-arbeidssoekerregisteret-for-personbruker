import { Brukerprofil, Stillingssoek, Tjenestestatus } from '@/model/brukerprofil';
import StartStyrkloft from '@/components/styrkløft/start-styrkloft';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { useState } from 'react';
import AktivBruker from '@/components/styrkløft/aktiv-bruker';
import byggStillingssoekPayload from '@/lib/bygg-stillingssoek-payload';

interface onSubmitStillingsSoekPayload {
    fylker: string[];
    yrkeskategorier: string[];
}

interface Props {
    brukerprofil: Brukerprofil;
    onSubmitTjenestestatus(status: Tjenestestatus): Promise<void>;
    onSubmitStillingsSoek(data: onSubmitStillingsSoekPayload): Promise<void>;
    useOnFetchStillinger(): { data?: any; error?: Error };
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

function hentBrukerprofil(
    brukerprofil: Brukerprofil,
    harLagretSoek: null | onSubmitStillingsSoekPayload,
): Brukerprofil {
    const skalSetteStillingssoek = Boolean(harLagretSoek) && (brukerprofil.stillingssoek ?? []).length === 0;

    if (!skalSetteStillingssoek) {
        return brukerprofil;
    }

    return { ...brukerprofil, stillingssoek: byggStillingssoekPayload(harLagretSoek!) };
}

function StyrkLoft(props: Props) {
    const { brukerprofil, sprak, useOnFetchStillinger, onSubmitTjenestestatus } = props;
    const [harLagretSoek, settHarLagretSoek] = useState<null | onSubmitStillingsSoekPayload>(null);

    const erAvmeldt = brukerprofil.tjenestestatus === 'OPT_OUT' || brukerprofil.tjenestestatus === 'KAN_IKKE_LEVERES';
    const visStartKomponent =
        brukerprofil.tjenestestatus === 'INAKTIV' || (brukerprofil.stillingssoek ?? []).length === 0;
    const visStillinger = brukerprofil.tjenestestatus === 'AKTIV' && (brukerprofil.stillingssoek ?? []).length > 0;

    const onSubmitStillingsSoek = async (data: onSubmitStillingsSoekPayload) => {
        await props.onSubmitStillingsSoek(data);
        settHarLagretSoek(data);
    };

    return (
        <StyrkLoftStateless
            erAvmeldt={erAvmeldt}
            visStartKomponent={visStartKomponent}
            visStillinger={visStillinger || Boolean(harLagretSoek)}
            brukerprofil={hentBrukerprofil(brukerprofil, harLagretSoek)}
            onSubmitTjenestestatus={onSubmitTjenestestatus}
            onSubmitStillingsSoek={onSubmitStillingsSoek}
            useOnFetchStillinger={useOnFetchStillinger}
            sprak={sprak}
        />
    );
}

export default StyrkLoft;
