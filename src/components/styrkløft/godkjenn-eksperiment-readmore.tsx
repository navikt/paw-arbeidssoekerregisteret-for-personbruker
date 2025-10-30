import { ReadMore, List } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';

interface ReadMoreProps {
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        header: 'Mer informasjon',
        om: 'Du kan sette opp et forenklet søk mot arbeidsplassen.no og få vist resultatet her',
        endre: 'Du kan endre søkekriteriene i ettertid',
        privat: 'Det er kun du som ser hvilket søk du har lagret og hvilke stillinger du får opp',
        avslutte: 'Du kan når som helst slå av søket',
        sletting: 'Det lagrede søket slettes etter 30 dager når du ikke lenger er registrert arbeidssøker',
        adressebeskyttelse: 'Du kan ikke benytte tjenesten ennå dersom du har en form for adressebeskyttelse',
        testing: 'Denne tjenesten er under utprøving og kan forsvinne i fremtiden',
    },
};

export default function ReadMoreEksperiment(props: ReadMoreProps) {
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <ReadMore header={tekst('header')}>
            <List as="ul">
                <List.Item>{tekst('om')}</List.Item>
                <List.Item>{tekst('endre')}</List.Item>
                <List.Item>{tekst('privat')}</List.Item>
                <List.Item>{tekst('avslutte')}</List.Item>
                <List.Item>{tekst('sletting')}</List.Item>
                <List.Item>{tekst('adressebeskyttelse')}</List.Item>
                <List.Item>{tekst('testing')}</List.Item>
            </List>
        </ReadMore>
    );
}
