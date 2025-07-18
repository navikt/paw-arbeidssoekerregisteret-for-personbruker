'use client';

import { BodyShort, ReadMore } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { useState } from 'react';
import { loggAktivitet } from '@/lib/tracking/logg-aktivitet';

interface ReadmoreProps {
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        header: 'Hva slags hjelp kan du få fra en veileder?',
        veiledersOppgaver:
            'Veilederens oppgave er å besvare spørsmål, bistå deg med å søke stillinger og tilby deg hjelp på veien til arbeid.',
        veilederKanIkke:
            'Veilederne kan ikke svare på spørsmål om søknad om dagpenger, behandling av dagpengesøknaden, utbetaling av dagpenger eller utfylling av meldekort.',
    },
};

function Innhold(props: ReadmoreProps) {
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <div>
            <BodyShort spacing>{tekst('veiledersOppgaver')}</BodyShort>
            <BodyShort spacing>{tekst('veilederKanIkke')}</BodyShort>
        </div>
    );
}

function ReadMoreVeileder(props: ReadmoreProps) {
    const [clickedReadMoreHjelp, setClickedReadMore] = useState<boolean>(false);
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    const handleClickReadMore = () => {
        if (!clickedReadMoreHjelp) {
            // loggAktivitet({ aktivitet: 'Trykker på "Readmore: Hva slags hjelp kan du få"' });
            setClickedReadMore(true);
        }
    };
    return (
        <ReadMore size="medium" header={tekst('header')} onClick={() => handleClickReadMore()}>
            <Innhold sprak={sprak} />
        </ReadMore>
    );
}

export default ReadMoreVeileder;
