import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';

const TEKSTER = {
    nb: {
        heading: 'Endring i meldekort for arbeidssøkere',
        bodyText1:
            'Fra 12. mars må du bekrefte at du fortsatt vil være arbeidssøker på en ny måte hvis du ikke mottar dagpenger.  Du vil du få en oppgave på min side om å bekrefte at du vil være arbeidssøker hver 14. dag. Fristene vil være de samme som i dag.',
        bodyText2:
            'Hvis du ikke mottar pengestøtte fra Nav vil du ikke lenger måtte sende inn meldekort, kun bekrefte at du fortsatt vil være arbeidssøker.',
        bodyText3: 'Spørsmålet om du fortsatt vil være registrert som arbeidssøker vil forsvinne fra meldekortet. ',
    },
};

interface Props {
    sprak: Sprak;
}
const EndringAlert = (props: Props) => {
    const tekst = lagHentTekstForSprak(TEKSTER, props.sprak);

    return (
        <Alert variant={'info'} className={'mb-4'}>
            <Heading spacing size="small" level="3">
                {tekst('heading')}
            </Heading>
            <BodyLong spacing>{tekst('bodyText1')}</BodyLong>
            <BodyLong spacing>{tekst('bodyText2')}</BodyLong>
            <BodyLong>{tekst('bodyText3')}</BodyLong>
        </Alert>
    );
};

export default EndringAlert;
