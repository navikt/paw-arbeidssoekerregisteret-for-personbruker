import { BodyShort, Box, Button } from '@navikt/ds-react';
import { UseOnSubmitTjenestestatusResult } from '@/components/styrkløft/useOnSubmitTjenestestatus';

interface AvmeldtKomponentProps extends Omit<UseOnSubmitTjenestestatusResult, 'onSubmitTjenestestatus'> {
    onSubmit(): Promise<void>;
}

function AvmeldtStateless(props: AvmeldtKomponentProps) {
    const { pendingTjenestestatus, onSubmit } = props;
    return (
        <Box background="info-soft" borderRadius="8" padding="space-12">
            <BodyShort size={'small'}>
                Du har sagt at du ikke vil se ledige stillinger.{' '}
                <span className={'mr-2'}>Ønsker du å ombestemme deg?</span>
                <Button
                    variant={'secondary-neutral'}
                    size={'xsmall'}
                    onClick={onSubmit}
                    disabled={Boolean(pendingTjenestestatus)}
                    aria-busy={Boolean(pendingTjenestestatus)}
                >
                    Skru på ledige stillinger
                </Button>
            </BodyShort>
        </Box>
    );
}

export default AvmeldtStateless;
