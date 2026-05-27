import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { BodyShort, Box, Button, HStack } from '@navikt/ds-react';
import type { UseOnSubmitTjenestestatusResult } from '@/components/styrkløft/useOnSubmitTjenestestatus';

interface AvmeldtKomponentProps extends Omit<UseOnSubmitTjenestestatusResult, 'onSubmitTjenestestatus'> {
    onSubmit(): Promise<void>;
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        bodyTekst: 'Du har sagt at du ikke vil se ledige stillinger. Ønsker du å ombestemme deg?',
        buttonTekst: 'Vis ledige stillinger',
    },
    nn: {
        bodyTekst: 'Du har sagt at du ikkje vil sjå ledige stillingar. Ønskjer du å ombestemme deg?',
        buttonTekst: 'Vis ledige stillingar',
    },
    en: {
        bodyTekst: "You said you don't want to see available jobs. Would you like to change your mind?",
        buttonTekst: 'Show available jobs',
    },
};

function AvmeldtStateless(props: AvmeldtKomponentProps) {
    const { pendingTjenestestatus, onSubmit } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, props.sprak);
    return (
        <Box background="info-soft" borderRadius="8" padding="space-8">
            <HStack gap="space-8" justify="space-between" align="center">
                <BodyShort size={'small'}>{tekst('bodyTekst')}</BodyShort>
                <Button
                    variant={'secondary-neutral'}
                    size={'xsmall'}
                    onClick={onSubmit}
                    disabled={Boolean(pendingTjenestestatus)}
                    loading={Boolean(pendingTjenestestatus)}
                >
                    {tekst('buttonTekst')}
                </Button>
            </HStack>
        </Box>
    );
}

export default AvmeldtStateless;
