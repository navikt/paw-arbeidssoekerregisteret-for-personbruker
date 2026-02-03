'use client';

import { BodyShort, ReadMore } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { useState } from 'react';

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
    nn: {
        header: 'Kva slags hjelp kan du få frå ein rettleiar?',
        veiledersOppgaver:
            'Oppgåva til rettleiaren er å svare på spørsmål, hjelpe deg med å søkje stillingar og tilby deg hjelp på vegen til arbeid.',
        veilederKanIkke:
            'Rettleiarane kan ikkje svare på spørsmål om søknad om dagpengar, behandling av dagpengesøknaden, utbetaling av dagpengar eller utfylling av meldekort.',
    },
    en: {
        header: 'What kind of help can you get from a supervisor?',
        veiledersOppgaver:
            'A supervisor’s role is to answer questions, help you apply for jobs, and support you on your way to work.',
        veilederKanIkke:
            'Supervisors cannot answer questions about applying for unemployment benefits, processing of the application, payment of benefits, or filling out employment status cards.',
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
