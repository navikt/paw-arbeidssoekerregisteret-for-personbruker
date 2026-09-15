import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { LinkCard } from '@navikt/ds-react';
import type React from 'react';

import { loggDirektemeldtStillinger } from '@/lib/tracking';

const TEKSTER = {
    nb: {
        linkTittel: 'Se flere jobbmuligheter på nav.no',
    },
    nn: {
        linkTittel: 'Sjå fleire jobbtilbod på nav.no',
    },
    en: {
        linkTittel: 'See more Job Opportunities at nav.no',
    },
};

type LinkTilDirektemeldteStillingerProps = {
    sprak: Sprak;
    jobbmuligheterUrl?: string;
};

const LinkTilDirektemeldteStillinger: React.FC<LinkTilDirektemeldteStillingerProps> = (props) => {
    const { sprak, jobbmuligheterUrl } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const urlTilJobbmuligheter = `${jobbmuligheterUrl}/sok`;

    return (
        <LinkCard
            data-color="accent"
            onClick={() => loggDirektemeldtStillinger({ aktivitet: 'Går til jobbmuligheter' })}
        >
            <LinkCard.Title>
                <LinkCard.Anchor href={urlTilJobbmuligheter}>{tekst('linkTittel')}</LinkCard.Anchor>
            </LinkCard.Title>
        </LinkCard>
    );
};

export { LinkTilDirektemeldteStillinger };
