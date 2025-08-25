import { Alert, BodyLong, Button, Heading, Link } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { useState } from 'react';
import Feilmelding from '@/components/bekreftelse/feilmelding';
import { prettyPrintDato } from '@/lib/date-utils';
import { loggAktivitet } from '@/lib/tracking';

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
            'Hvis du mottar eller har søkt om pengestøtte eller andre tjenester som krever at du er registrert arbeidssøker vil disse bli stoppet.',
        usikkerTekst: 'Er du usikker på om du trenger å være registrert som arbeidssøker så',
        usikkerKontaktOssLenkeTekst: 'ta kontakt med oss',
        kontaktOssLenke: 'https://www.nav.no/kontaktoss',
        confirm: 'Jeg vil ikke være registrert som arbeidssøker',
        cancel: 'Avbryt og gå tilbake',
    },
    nn: {
        heading: 'Stadfest at du ikkje ønskjer å være arbeidssøkjar',
        alertHeading: 'Du har svart at du ikkje ønskjer å være registrert som arbeidssøkjar',
        bodyText1: 'Du har status som arbeidssøkjar hos Nav fram til ',
        bodyText2:
            'Om du mottek eller har søkt om pengestøtte eller tjenestar som krev at du er registrert arbeidssøkjar vil disse stoppes',
        usikkerTekst: 'Er du usikker på om du treng å vera registrert som arbeidssøkjar så',
        usikkerKontaktOssLenkeTekst: 'ta kontakt med oss',
        kontaktOssLenke: 'https://www.nav.no/kontaktoss',
        confirm: 'Eg ønskjer ikkje å være registrert som arbeidssøkjar',
        cancel: 'Avbryt og gå tilbake',
    },
    en: {
        heading: 'Confirm that you no longer want to be registered as a jobseeker',
        alertHeading: 'You have answered that you do not want to be registered as a jobseeker',
        bodyText1: 'You will be registered as a jobseeker within Nav until ',
        bodyText2:
            'If you receive unemployment benefits requiring that you are registered as a jobseeker, these will be stopped',
        usikkerTekst: 'If you are unsure whether you need to be registered as a jobseeker,',
        usikkerKontaktOssLenkeTekst: 'please contact us',
        kontaktOssLenke: 'https://www.nav.no/kontaktoss',
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

    const onClikcKontaktOss = (e: any) => {
        loggAktivitet({ aktivitet: 'Trykker på "Kontakt oss" fra avbryt bekreftelse' });
        return e;
    };

    return (
        <>
            <Heading level={'1'} size={'xlarge'} className={'mb-4'}>
                {tekst('heading')}
            </Heading>
            <Alert variant={'warning'}>
                <Heading level={'3'} size={'small'}>
                    {tekst('alertHeading')}
                </Heading>
            </Alert>
            <BodyLong className={'my-4'}>
                {tekst('bodyText1')} {prettyPrintDato(new Date().toISOString(), sprak)}.
            </BodyLong>
            <BodyLong className="mb-4">{tekst('bodyText2')}</BodyLong>
            <BodyLong>
                {tekst('usikkerTekst')}{' '}
                <Link onClick={onClikcKontaktOss} href={tekst('kontaktOssLenke')}>
                    {tekst('usikkerKontaktOssLenkeTekst')}
                </Link>
            </BodyLong>
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
            <Button variant={'secondary'} onClick={onCancel} className={'w-full'} disabled={senderSkjema}>
                {tekst('cancel')}
            </Button>
            {error && <Feilmelding />}
        </>
    );
};

export { BekreftAvsluttPeriode };
