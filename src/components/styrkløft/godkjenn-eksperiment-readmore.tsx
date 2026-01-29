import { ReadMore, List, Box } from '@navikt/ds-react';
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
    nn: {
        header: 'Meir informasjon',
        om: 'Du kan setja opp eit forenkla søk mot arbeidsplassen.no og få vist resultatet her',
        endre: 'Du kan endra søkjekriteria i ettertid',
        privat: 'Det er berre du som ser kva søk du har lagra og kva stillingar du får opp',
        avslutte: 'Du kan når som helst slå av søket',
        sletting: 'Det lagra søket blir sletta etter 30 dagar når du ikkje lenger er registrert arbeidssøkjar',
        adressebeskyttelse: 'Du kan ikkje nytta tenesta enno dersom du har ei form for adressevern',
        testing: 'Denne tenesta er under utprøving og kan forsvinna i framtida',
    },
    en: {
        header: 'More information',
        om: 'You can set up a simplified search on arbeidsplassen.no and see the results here',
        endre: 'You can change the search criteria later',
        privat: 'Only you can see what search you have saved and what jobs you get',
        avslutte: 'You can turn off the search at any time',
        sletting: 'The saved search is deleted after 30 days when you are no longer registered as an employment seeker',
        adressebeskyttelse: 'You cannot use the service yet if you have a form of address protection',
        testing: 'This service is under testing and may disappear in the future',
    },
};

export default function ReadMoreEksperiment(props: ReadMoreProps) {
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <ReadMore header={tekst('header')}>
            <Box marginBlock="space-16" asChild>
                <List data-aksel-migrated-v8 as="ul">
                    <List.Item>{tekst('om')}</List.Item>
                    <List.Item>{tekst('endre')}</List.Item>
                    <List.Item>{tekst('privat')}</List.Item>
                    <List.Item>{tekst('avslutte')}</List.Item>
                    <List.Item>{tekst('sletting')}</List.Item>
                    <List.Item>{tekst('adressebeskyttelse')}</List.Item>
                    <List.Item>{tekst('testing')}</List.Item>
                </List>
            </Box>
        </ReadMore>
    );
}
