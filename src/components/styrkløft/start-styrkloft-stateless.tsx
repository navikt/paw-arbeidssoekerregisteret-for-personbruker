import GodkjennEksperiment from '@/components/styrkløft/godkjenn-eksperiment';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Tjenestestatus } from '@/model/brukerprofil';
import { Box } from '@navikt/ds-react';

interface Props {
    onSubmitTjenestestatus(status: Tjenestestatus): Promise<void>;
    pendingTjenestestatus: null | Tjenestestatus;
    errorTjenestestatus: null | string;
    sprak: Sprak;
}

export function StartStyrkloftStateless(props: Props) {
    const { sprak, onSubmitTjenestestatus, pendingTjenestestatus, errorTjenestestatus } = props;

    return (
        <Box className={'py-4 px-6'} borderRadius="8" borderColor={'neutral-subtle'} borderWidth={'1'}>
            <GodkjennEksperiment
                sprak={sprak}
                onSubmit={onSubmitTjenestestatus}
                pending={pendingTjenestestatus}
                error={errorTjenestestatus}
            />
        </Box>
    );
}
