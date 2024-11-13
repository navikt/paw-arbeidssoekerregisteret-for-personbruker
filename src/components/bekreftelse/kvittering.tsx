import { Alert, BodyLong, Button, Heading, Link } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
// import { loggAktivitet } from '../../lib/amplitude';

export interface Props {
    sprak: Sprak;
    erUtmeldt: boolean;
    harFlereBekreftelser: boolean;
    onClick(): void;
}

const TEKSTER = {
    nb: {
        headingUtmeldt: 'Du er ikke lenger registrert som arbeidssøker',
        heading: 'Du har bekreftet at du fortsatt vil være registrert som arbeidssøker',
        alertHeading: 'Vi har registrert svaret ditt',
        alertBody: 'Du har bekreftet status som arbeidssøker hos Nav.',
        alertHeadingUtmeldt: 'Fra og med idag vil du ikke lenger være registrert som arbeidssøker',
        alertBodyUtmeldt: 'Hvis du vil være arbeidssøker igjen må du registrere deg på nytt.',
        linkText: 'Gå tilbake til min side',
        buttonText: 'Bekreft neste periode',
    },
};

const Kvittering = (props: Props) => {
    const { sprak, erUtmeldt, harFlereBekreftelser, onClick } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    const loggKlikk = () => {
        // loggAktivitet({ aktivitet: 'Trykker på "Gå tilbake til min side" fra kvittering' });
    };

    return (
        <>
            {erUtmeldt ? (
                <>
                    <Heading size={'xlarge'} level={'1'} className={'mb-4'}>{tekst('headingUtmeldt')}</Heading>
                    <Alert variant={'warning'} className={'mb-4'}>
                        <Heading size={'xsmall'}>{tekst('alertHeadingUtmeldt')}</Heading>
                        <BodyLong>{tekst('alertBodyUtmeldt')}</BodyLong>
                    </Alert>
                </>
            ) : (
                <>
                    <Heading size={'xlarge'} level={'1'} className={'mb-4'}>{tekst('heading')}</Heading>
                    <Alert variant={'success'} className={'mb-4'}>
                        <Heading size={'xsmall'}>{tekst('alertHeading')}</Heading>
                        <BodyLong>{tekst('alertBody')}</BodyLong>
                    </Alert>
                </>
            )}
            {harFlereBekreftelser ? (
                <Button variant={'secondary'} onClick={onClick}>
                    {tekst('buttonText')}
                </Button>
            ) : (
                <Link href={'/minside'} onClick={loggKlikk}>
                    {tekst('linkText')}
                </Link>
            )}
        </>
    );
};

export { Kvittering };
