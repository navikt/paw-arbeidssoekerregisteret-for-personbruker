import { opprettLinkTilArbeidsplassen } from '@/lib/opprett-link-til-arbeidsplassen';
import { StedSoek } from '@/model/brukerprofil';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Link } from '@navikt/ds-react';
import React from 'react';

const TEKSTER = {
    nb: {
        linkTittel: 'Se flere stillinger hos arbeidsplassen.no',
    },
    nn: {
        linkTittel: 'Sjå fleire stillingar hjå arbeidsplassen.no',
    },
    en: {
        linkTittel: 'See more jobs at arbeidsplassen.no',
    },
};

type LinkTilArbeidsplassenProps = {
    stedSoek: StedSoek;
    sprak: Sprak;
};

const LinkTilArbeidsplassen: React.FC<LinkTilArbeidsplassenProps> = (props) => {
    const { stedSoek, sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const urlTilArbeidsplasen = opprettLinkTilArbeidsplassen(stedSoek);
    const UMAMI_EVENT_LINK_TO_ARBEIDSPLASSEN = 'paw-arbeidssoekerregisteret-for-personbruker-link-til-arbeidsplassen';

    return (
        <Link data-umami-event={UMAMI_EVENT_LINK_TO_ARBEIDSPLASSEN} href={urlTilArbeidsplasen}>
            {tekst('linkTittel')}
        </Link>
    );
};

export { LinkTilArbeidsplassen };
