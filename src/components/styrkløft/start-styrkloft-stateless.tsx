import type { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Box } from '@navikt/ds-react';
import GodkjennEksperiment from '@/components/styrkløft/godkjenn-eksperiment';
import type { Tjenestestatus } from '@/model/brukerprofil';

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
