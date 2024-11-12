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
        bodyText2: 'Hvis du mottar eller har søkt om tjenester eller ytelser som krever at du er registrert arbeidssøker vil disse stoppes.',
        confirm: 'Jeg vil ikke være registrert som arbeidssøker',
        cancel: 'Avbryt og gå tilbake',
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
                <BodyLong className={'mb-4'}>{tekst('bodyText1')} {prettyPrintDato(new Date().toISOString())}.</BodyLong>
                <BodyLong>{tekst('bodyText2')}</BodyLong>
                <div className={'my-4'}>
                    <Button
                        variant={'primary'}
                        onClick={onSubmit}
                        className={'w-full'}
                        disabled={senderSkjema}
                        loading={senderSkjema}
                    >
                        {tekst('confirm')}
                    </Button>
                </div>
                <Button variant={'secondary-neutral'} onClick={onCancel} className={'w-full'} disabled={senderSkjema}>
                    {tekst('cancel')}
                </Button>
                {error && <Feilmelding />}
            </Alert>
        </>
    );
};

export { BekreftAvsluttPeriode };
