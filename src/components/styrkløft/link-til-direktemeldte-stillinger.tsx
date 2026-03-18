import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { LinkCard } from '@navikt/ds-react';
import React from 'react';

import { loggDirektemeldtStillinger } from '@/lib/tracking';

const TEKSTER = {
    nb: {
        linkTittel: 'Se flere jobbmuligheter hos arbeidsplassen.no',
    },
    nn: {
        linkTittel: 'Sjå fleire jobbmoglegheiter hos arbeidsplassen.no',
    },
    en: {
        linkTittel: 'See more job opportunities at arbeidsplassen.no',
    },
};

type LinkTilDirektemeldteStillingerProps = {
    sprak: Sprak;
};

const LinkTilDirektemeldteStillinger: React.FC<LinkTilDirektemeldteStillingerProps> = (props) => {
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const urlTilArbeidsplasen = 'http://arbeidsplassen.nav.no/muligheter';

    return (
        <LinkCard
            data-color="accent"
            onClick={() => loggDirektemeldtStillinger({ aktivitet: 'Går til søk på arbeidsplassen' })}
        >
            <LinkCard.Title>
                <LinkCard.Anchor href={urlTilArbeidsplasen}>{tekst('linkTittel')}</LinkCard.Anchor>
            </LinkCard.Title>
        </LinkCard>
    );
};

export { LinkTilDirektemeldteStillinger };
