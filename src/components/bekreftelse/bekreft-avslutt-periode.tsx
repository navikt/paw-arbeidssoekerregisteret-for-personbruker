import { Alert, BodyLong, Button, Heading } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { useState } from 'react';
import Feilmelding from '@/components/bekreftelse/feilmelding';
import { prettyPrintDato } from '@/lib/date-utils';

interface Props {
    onSubmit(): void;
    onCancel(): void;
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        heading: 'Bekreft at du ikke lenger ønsker å være arbeidssøker',
        alertHeading: 'Du har svart at du ikke lenger ønsker å være registrert som arbeidssøker',
        bodyText1: 'Du har status som arbeidssøker hos Nav fram til ',
        bodyText2:
            'Hvis du mottar eller har søkt om tjenester eller ytelser som krever at du er registrert arbeidssøker vil disse stoppes.',
        confirm: 'Jeg vil ikke være registrert som arbeidssøker',
        cancel: 'Avbryt og gå tilbake',
    },
    nn: {
        heading: 'Stadfest at du ikkje ønskjer å være arbeidssøkjar',
        alertHeading: 'Du har svart at du ikkje ønskjer å være registrert som arbeidssøkjar',
        bodyText1: 'Du har status som arbeidssøkjar hos Nav fram til ',
        bodyText2:
            'Om du mottek eller har søkt om tjenestar eller ytelsar som krev at du er registrert arbeidssøkjar vil disse stoppes',
        confirm: 'Eg ønskjer ikkje å være registrert som arbeidssøkjar',
        cancel: 'Avbryt og gå tilbake',
    },
    en: {
        heading: 'Confirm that you no longer want to be registered as a jobseeker',
        alertHeading: 'You have answered that you do not want to be registered as a jobseeker',
        bodyText1: 'You will be registered as a jobseeker within Nav until ',
        bodyText2:
            'If you receive unemployment benefits requiring that you are registered as a jobseeker, these will be stopped',
        confirm: 'I do not wish to be registered as a jobseeker',
        cancel: 'Cancel and go back',
    },
};

const BekreftAvsluttPeriode = (props: Props) => {
    const { sprak, onCancel } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const [senderSkjema, settSenderSkjema] = useState<boolean>(false);
    const [error, settError] = useState<any>(null);

    const onSubmit = async () => {
        settSenderSkjema(true);
        settError(null);

        try {
            await props.onSubmit();
        } catch (err) {
            settError(err);
        } finally {
            settSenderSkjema(false);
        }
    };

    return (
        <>
            <Heading level={'1'} size={'xlarge'} className={'mb-4'}>
                {tekst('heading')}
            </Heading>
            <Alert variant={'warning'}>
                <Heading level={'3'} size={'small'} className={'mb-4'}>
                    {tekst('alertHeading')}
                </Heading>
                <BodyLong className={'mb-4'}>
                    {tekst('bodyText1')} {prettyPrintDato(new Date().toISOString(), sprak)}
                </BodyLong>
                <BodyLong>{tekst('bodyText2')}</BodyLong>
                <div className={'my-4'}>
                    <Button
                        variant={'secondary-neutral'}
                        onClick={onSubmit}
                        className={'w-full'}
                        disabled={senderSkjema}
                        loading={senderSkjema}
                    >
                        {tekst('confirm')}
                    </Button>
                </div>
                <Button variant={'tertiary-neutral'} onClick={onCancel} className={'w-full'} disabled={senderSkjema}>
                    {tekst('cancel')}
                </Button>
                {error && <Feilmelding />}
            </Alert>
        </>
    );
};

export { BekreftAvsluttPeriode };
