import { MenuElipsisVerticalIcon } from '@navikt/aksel-icons';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { ActionMenu, Button } from '@navikt/ds-react';
import React from 'react';

import { loggStyrkeloft } from '@/lib/tracking';

const TEKSTER = {
    nb: {
        heading: 'Valg for arbeidsøket',
        endresok: 'Endre søket mitt',
        slutt: 'Jeg ønsker ikke lengre å se ledige stillinger',
    },
    nn: {
        heading: 'Val for arbeidsøket',
        endresok: 'Endre søket mitt',
        slutt: 'Eg ønskjer ikkje lengre å sjå ledige stillingar',
    },
    en: {
        heading: 'Options for job search',
        endresok: 'Edit my search',
        slutt: 'I no longer want to see vacant jobs',
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
                        onClick={() => loggStyrkeloft({ aktivitet: 'Åpner flervalgsmeny' })}
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
