import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { LocalAlert } from '@navikt/ds-react';

interface Props {
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        title: 'Nyhet: nå kan du velge blant flere yrkeskategorier',
        content: 'Endre søket ditt ved å trykke på ikonet ovenfor i det høyre hjørnet.',
    },
    nn: {
        title: 'Nyheit: no kan du velja blant fleire yrkeskategoriar',
        content: 'Endre søket ditt ved å trykkja på ikonet ovanfor i det høgre hjørnet.',
    },
    en: {
        title: 'New feature: choose from more job categories',
        content: 'Edit your search by clicking the icon in the above right corner.',
    },
};

export default function NyhetUnderkategoriAlert(props: Props) {
    const tekst = lagHentTekstForSprak(TEKSTER, props.sprak);
    return (
        <LocalAlert status="announcement" className={'mb-4'}>
            <LocalAlert.Header>
                <LocalAlert.Title>{tekst('title')}</LocalAlert.Title>
            </LocalAlert.Header>
            <LocalAlert.Content>{tekst('content')}</LocalAlert.Content>
        </LocalAlert>
    );
}
