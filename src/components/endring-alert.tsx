import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';

const TEKSTER = {
    nb: {
        heading: 'Endring for deg som sender meldekort',
        bodyText1:
            'Fra 20. mars blir det endringer for deg som er registrert som arbeidssøker hos Nav. Hver 14. dag vil du få en oppgave på Min side der du bekrefter at du fortsatt vil være registrert som arbeidssøker. Fristene vil være de samme som i dag.',
        bodyText2:
            'Mottar du en pengestøtte må du sende inn meldekort for den aktuelle pengestøtten i tillegg.',
        bodyText3: 'Dagpengemottakere skal fortsette å bekrefte sin status som arbeidssøkere gjennom dagpengemeldekortet . De får derfor ikke bekreftelsesoppgave på Min side, så lenge de har meldekort for dagpenger.',
    },
    nn: {
        heading: 'Endring for deg som sender meldekort',
        bodyText1:
            'Frå 20. mars blir det endringar for deg som er registrert som arbeidssøkjar hos Nav. Kvar 14. dag vil du få ei oppgåve på Mi side der du stadfestar at du framleis vil vera registrert som arbeidssøkjar. Fristane vil vera dei same som i dag.',
        bodyText2:
            'Får du ei pengestøtte må du senda inn meldekort for den aktuelle pengestøtta i tillegg.',
        bodyText3: 'Dagpengemottakarar skal halda fram med å stadfesta statusen sin som arbeidssøkjarar gjennom dagpengemeldekortet . Dei får derfor ikkje stadfestingsoppgåve på Mi side, så lenge dei har meldekort for dagpengar.',
    },
    en: {
        heading: 'Change for those who send employment status form for job seekers',
        bodyText1:
            'From March 20th, there will be changes for those of you who are registered as a job seeker with Nav. Every 14 days you will receive a task on My Page where you confirm that you will still be registered as a job seeker. The deadlines will be the same as today.',
        bodyText2:
            'If you receive financial support, you must also submit a report card for the relevant financial support.',
        bodyText3: 'Unemployment benefit recipients must continue to confirm their status as job seekers through their employment status form for job seekers. They will therefore not receive a confirmation form on My Page as long as they have a employment status form for job seekers.',
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
