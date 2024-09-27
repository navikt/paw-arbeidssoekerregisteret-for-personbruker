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
        alertHeading: 'Vi har registrert svaret ditt',
        alertBody: 'Du har bekreftet status som arbeidssøker hos NAV.',
        alertHeadingUtmeldt: 'Du er ikke lenger registrert som arbeidssøker',
        alertBodyUtmeldt: 'Hvis du ønsker å endre dette må du registrere deg på nytt',
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
                <Alert variant={'info'} className={'mb-4'}>
                    <Heading size={'xsmall'}>{tekst('alertHeadingUtmeldt')}</Heading>
                    <BodyLong>{tekst('alertBodyUtmeldt')}</BodyLong>
                </Alert>
            ) : (
                <Alert variant={'success'} className={'mb-4'}>
                    <Heading size={'xsmall'}>{tekst('alertHeading')}</Heading>
                    <BodyLong>{tekst('alertBody')}</BodyLong>
                </Alert>
            )}
            {harFlereBekreftelser ? (
                <Button variant={'secondary'} onClick={onClick}>
                    {tekst('buttonText')}
                </Button>
            ) : (
                <Link href={`${location.origin}/minside`} onClick={loggKlikk}>
                    {tekst('linkText')}
                </Link>
            )}
        </>
    );
};

export { Kvittering };
