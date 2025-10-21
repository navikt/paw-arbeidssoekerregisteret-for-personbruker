import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Tjenestestatus } from '@/model/brukerprofil';
import GodkjennEksperimentStatic from '@/components/styrkløft/godkjenn-eksperiment-static';

interface Props {
    sprak: Sprak;
    onSubmit(val: Tjenestestatus): Promise<void>;
    error?: string | null;
    pending?: string | null;
}

function GodkjennEksperiment(props: Props) {
    const { sprak, onSubmit, pending, error } = props;

    return (
        <GodkjennEksperimentStatic
            sprak={sprak}
            visAvmeldtLoader={pending === 'OPT_OUT'}
            visGodkjennLoader={pending === 'AKTIV'}
            visFeilmelding={Boolean(error)}
            onGodkjennSubmit={() => onSubmit('AKTIV')}
            onAvmeldSubmit={() => onSubmit('OPT_OUT')}
        />
    );
}

export default GodkjennEksperiment;
