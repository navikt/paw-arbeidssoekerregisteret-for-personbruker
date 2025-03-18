'use client';

import { BodyLong, BodyShort, Box, Button, Link } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { loggAktivitet } from '@/lib/amplitude';

interface ManglerOpplysningerProps {
    sprak: Sprak;
    oppdaterOpplysningerUrl: string;
}

const TEKSTER = {
    nb: {
        header: 'Du er registrert som arbeidssøker.',
        body: 'Du kan legge inn flere opplysninger om din situasjon slik at det er enklere for oss å tilby riktige tjenester.',
        linkText: 'Legg til flere opplysninger',
    },
    nn: {
        header: 'Du er registrert som arbeidssøkjar.',
        body: 'Du kan leggja inn fleire opplysningar om din situasjon slik at det er enklare for oss å tilby rette tenester.',
        linkText: 'Legg til fleire opplysningar',
    },
    en: {
        header: 'You are registered as a job seeker.',
        body: 'You can enter more information about your situation to make it easier for us to provide the right services.',
        linkText: 'Add more information',
    },
};

const ManglerOpplysninger = (props: ManglerOpplysningerProps) => {
    const { sprak, oppdaterOpplysningerUrl } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Box background="surface-default" padding="6" borderRadius="xlarge" borderColor="border-subtle" borderWidth="1">
            <BodyShort className={'mb-2'}>{tekst('header')}</BodyShort>
            <BodyLong spacing>{tekst('body')}</BodyLong>
            <Button
                variant={'secondary'}
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
