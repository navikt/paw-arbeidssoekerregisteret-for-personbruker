import { opprettLinkTilArbeidsplassen } from '@/lib/opprett-link-til-arbeidsplassen';
import { Brukerprofil } from '@/model/brukerprofil';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Link } from '@navikt/ds-react';
import React from 'react';

const TEKSTER = {
    nb: {
        linkTittel: 'Se flere treff hos Arbeidsplassen',
    },
    nn: {
        linkTittel: 'Sjå fleire treff hjå Arbeidsplassen',
    },
    en: {
        linkTittel: 'See more results at Arbeidsplassen',
    },
};

type LinkTilArbeidsplassenProps = {
    brukerprofil: Brukerprofil;
    sprak: Sprak;
};

const LinkTilArbeidsplassen: React.FC<LinkTilArbeidsplassenProps> = (props) => {
    const { brukerprofil, sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const urlTilArbeidsplasen = opprettLinkTilArbeidsplassen(brukerprofil);
    const UMAMI_EVENT_LINK_TO_ARBEIDSPLASSEN = 'paw-arbeidssoekerregisteret-for-personbruker-link-til-arbeidsplassen';

    return (
        <Link data-umami-event={UMAMI_EVENT_LINK_TO_ARBEIDSPLASSEN} href={urlTilArbeidsplasen}>
            {tekst('linkTittel')}
        </Link>
    );
};

export { LinkTilArbeidsplassen };
