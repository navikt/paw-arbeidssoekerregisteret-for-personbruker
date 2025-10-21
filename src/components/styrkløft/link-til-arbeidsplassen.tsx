import { BrukerprofilTemp } from '@/lib/brukerprofil/mock-data';
import { opprettLinkTilArbeidsplassen } from '@/lib/brukerprofil/opprett-link-til-arbeidsplassen';
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
    brukerprofil: BrukerprofilTemp;
    sprak: Sprak;
};

const LinkTilArbeidsplassen: React.FC<LinkTilArbeidsplassenProps> = (props) => {
    const { brukerprofil, sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const urlTilArbeidsplasen = opprettLinkTilArbeidsplassen(brukerprofil);
    // TODO: Umami
    return <Link href={urlTilArbeidsplasen}>{tekst('linkTittel')}</Link>;
};

export { LinkTilArbeidsplassen };
