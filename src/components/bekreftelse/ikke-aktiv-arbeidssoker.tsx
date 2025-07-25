'use client';

import { Button, Heading } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { useEffect } from 'react';
import { loggVisning } from '@/lib/tracking/amplitude';
import { useLoggAktivitet } from '@/hooks/use-logg-aktivitet';

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
    const loggAktivitet = useLoggAktivitet();

    const onClick = () => {
        loggAktivitet({ aktivitet: 'Trykker på "Jeg ønsker å registrere meg på nytt" fra bekreftelse' });
        document.location.href = registrerArbeidssokerUrl;
    };

    useEffect(() => {
        loggVisning({ viser: 'IkkeAktivArbeidssøker fra Bekreftelse' });
    }, []);

    return (
        <div className={'px-4'}>
            <Heading level="1" size="medium" className={'mb-6'}>
                {tekst('heading')}
            </Heading>
            <Button variant={'secondary'} onClick={onClick}>
                {tekst('buttonText')}
            </Button>
        </div>
    );
};

export { IkkeAktivArbeidssoker };
