'use client';

import { Alert, BodyLong, BodyShort, Box, Button, Link } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { loggAktivitet } from '@/lib/amplitude';

interface ManglerOpplysningerProps {
    sprak: Sprak;
    oppdaterOpplysningerUrl: string;
    visAdvarsel: boolean;
}

const TEKSTER = {
    nb: {
        header: 'Du er registrert som arbeidssøker.',
        body: 'Du kan legge inn flere opplysninger om din situasjon slik at det er enklere for oss å tilby riktige tjenester.',
        linkText: 'Legg til flere opplysninger',
        alertText:
            'Du har logget inn med Min ID. For å kunne legge til opplysninger, vil du bli bedt om å logge inn med BankID, Buypass eller Commfides.',
    },
    nn: {
        header: 'Du er registrert som arbeidssøkjar.',
        body: 'Du kan leggja inn fleire opplysningar om din situasjon slik at det er enklare for oss å tilby rette tenester.',
        linkText: 'Legg til fleire opplysningar',
        alertText:
            'Du har logga inn med Min ID. For å kunna leggja til opplysningar, vil du bli bede om å logga inn med BankID, Buypass eller Commfides.',
    },
    en: {
        header: 'You are registered as a jobseeker.',
        body: 'You can enter more information about your situation to make it easier for us to provide the right services.',
        linkText: 'Add more information',
        alertText:
            'You have logged in with Min ID. To add information, you will be asked to log in with BankID, Buypass or Commfides.',
    },
};

const ManglerOpplysninger = (props: ManglerOpplysningerProps) => {
    const { sprak, oppdaterOpplysningerUrl, visAdvarsel } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Box background="surface-default" padding="6" borderRadius="xlarge" borderColor="border-subtle" borderWidth="1">
            <BodyShort className={'mb-2'}>{tekst('header')}</BodyShort>
            <BodyLong spacing={!visAdvarsel}>{tekst('body')}</BodyLong>
            {visAdvarsel && <Alert className={'my-4'} variant={'info'}>{tekst('alertText')}</Alert>}
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
