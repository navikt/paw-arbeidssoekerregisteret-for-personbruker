'use client';

import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Box, Button, Heading } from '@navikt/ds-react';
import { useEffect } from 'react';
import { loggAktivitet, loggVisning } from '@/lib/tracking';

interface Props {
    sprak: Sprak;
    registrerArbeidssokerUrl: string;
}
const TEKSTER = {
    nb: {
        heading: 'Du er ikke registert som aktiv arbeidssøker',
        buttonText: 'Jeg ønsker å registrere meg som arbeidssøker',
    },
    nn: {
        heading: 'Du er ikkje registert som aktiv arbeidssøkjar',
        buttonText: 'Eg ønskjer å registrere meg som arbeidssøkjar',
    },
    en: {
        heading: 'You are not registered as an active jobseeker',
        buttonText: 'I want to register as a jobseeker',
    },
};

const IkkeAktivArbeidssoker = (props: Props) => {
    const { sprak, registrerArbeidssokerUrl } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    const onClick = () => {
        loggAktivitet({ aktivitet: 'Trykker på "Jeg ønsker å registrere meg på nytt" fra bekreftelse' });
        document.location.href = registrerArbeidssokerUrl;
    };

    useEffect(() => {
        loggVisning({ viser: 'IkkeAktivArbeidssøker fra Bekreftelse' });
    }, []);

    return (
        <Box paddingInline="space-16">
            <Box asChild marginBlock="space-0 space-24">
                <Heading level="1" size="medium">
                    {tekst('heading')}
                </Heading>
            </Box>
            <Button variant={'secondary'} onClick={onClick}>
                {tekst('buttonText')}
            </Button>
        </Box>
    );
};

export { IkkeAktivArbeidssoker };
