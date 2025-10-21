import { MenuElipsisVerticalIcon } from '@navikt/aksel-icons';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { ActionMenu, Button } from '@navikt/ds-react';
import React from 'react';

const TEKSTER = {
    nb: {
        heading: 'Valg for arbeidsøket',
        endresok: 'Endre søke mitt',
        slutt: 'Jeg ønsker ikke lengre å se søk',
    },
    nn: {
        heading: 'Val for arbeidsøket',
        endresok: 'Endre søke mitt',
        slutt: 'Eg ønskjer ikkje lengre å sjå søk',
    },
    en: {
        heading: 'Options for job search',
        endresok: 'Change my search',
        slutt: 'I no longer want to see search',
    },
};

type FlerValgsMenyProps = {
    onEditSearch: () => void;
    onEnd: () => void;
    sprak: Sprak;
};

const FlerValgsMeny: React.FC<FlerValgsMenyProps> = (props) => {
    const { onEditSearch, onEnd, sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <div>
            <ActionMenu>
                <ActionMenu.Trigger>
                    <Button
                        variant="tertiary-neutral"
                        icon={<MenuElipsisVerticalIcon title="Saksmeny" />}
                        size="small"
                    />
                </ActionMenu.Trigger>
                <ActionMenu.Content>
                    <ActionMenu.Group label="Tilvalg for arbeidsøket">
                        <ActionMenu.Item onSelect={onEditSearch}>{tekst('endresok')}</ActionMenu.Item>
                        <ActionMenu.Item onSelect={onEnd}>{tekst('slutt')}</ActionMenu.Item>
                    </ActionMenu.Group>
                </ActionMenu.Content>
            </ActionMenu>
        </div>
    );
};

export { FlerValgsMeny };
