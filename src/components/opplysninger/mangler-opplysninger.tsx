'use client';

import { BodyShort, Box, Button, Link } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { loggAktivitet } from '@/lib/amplitude';

interface ManglerOpplysningerProps {
    sprak: Sprak;
    oppdaterOpplysningerUrl: string;
}

const TEKSTER = {
    nb: {
        header: 'Du har registrert deg som arbeidssøker, men ikke lagt til opplysninger enda.',
        linkText: 'Legg til opplysninger',
    },
};

const ManglerOpplysninger = (props: ManglerOpplysningerProps) => {
    const { sprak, oppdaterOpplysningerUrl } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Box background="surface-default" padding="6" borderRadius="xlarge" borderColor="border-subtle" borderWidth="1">
            <BodyShort>{tekst('header')}</BodyShort>
            <Button
                variant={'secondary-neutral'}
                onClick={() => {
                    loggAktivitet({ aktivitet: 'Trykker på "Legg til opplysninger"' });
                    document.location.href = oppdaterOpplysningerUrl;
                }}
            >
                {tekst('linkText')}
            </Button>
        </Box>
    );
};

export default ManglerOpplysninger;
