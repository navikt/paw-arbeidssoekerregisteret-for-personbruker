import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { LocalAlert } from '@navikt/ds-react';
import { MenuElipsisVerticalIcon } from '@navikt/aksel-icons';

interface Props {
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        title: 'Nyhet: nå kan du velge blant flere yrkeskategorier',
        contentPreIcon: 'Endre søket ditt ved å trykke på',
        contentPostIcon: 'ikonet ovenfor i det høyre hjørnet.',
    },
    nn: {
        title: 'Nyheit: no kan du velja blant fleire yrkeskategoriar',
        contentPreIcon: 'Endre søket ditt ved å trykkja på',
        contentPostIcon: 'ikonet ovanfor i det høgre hjørnet.',
    },
    en: {
        title: 'New feature: choose from more job categories',
        contentPreIcon: 'Edit your search by clicking the',
        contenPostIcon: 'icon in the above right corner.',
    },
};

export default function NyhetUnderkategoriAlert(props: Props) {
    const tekst = lagHentTekstForSprak(TEKSTER, props.sprak);
    return (
        <LocalAlert status="announcement" className={'mb-4'}>
            <LocalAlert.Header>
                <LocalAlert.Title>{tekst('title')}</LocalAlert.Title>
            </LocalAlert.Header>
            <LocalAlert.Content className="flex">
                {tekst('contentPreIcon')} &quot;
                <MenuElipsisVerticalIcon title="Saksmeny" className="align-text-bottom" />
                &quot; {tekst('contentPostIcon')}
            </LocalAlert.Content>
        </LocalAlert>
    );
}
