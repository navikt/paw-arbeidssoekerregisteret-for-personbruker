import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { useState } from 'react';
import { Tjenestestatus } from '@/model/brukerprofil';
import GodkjennEksperimentStatic from '@/components/styrkløft/godkjenn-eksperiment-static';

interface Props {
    sprak: Sprak;
    onSubmit(val: Tjenestestatus): Promise<void>;
}

function GodkjennEksperiment(props: Props) {
    const { sprak, onSubmit } = props;
    const [pending, setPending] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onSubmitWrapper = (status: Tjenestestatus) => async () => {
        try {
            setPending(status);
            setError(null);
            await onSubmit(status);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setPending(null);
        }
    };

    return (
        <GodkjennEksperimentStatic
            sprak={sprak}
            visAvmeldtLoader={pending === 'OPT_OUT'}
            visGodkjennLoader={pending === 'AKTIV'}
            visFeilmelding={Boolean(error)}
            onGodkjennSubmit={onSubmitWrapper('AKTIV')}
            onAvmeldSubmit={onSubmitWrapper('OPT_OUT')}
        />
    );
}

export default GodkjennEksperiment;
