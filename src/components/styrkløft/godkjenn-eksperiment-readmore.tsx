import { ReadMore } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';

interface ReadMoreProps {
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        header: 'Mer informasjon',
    },
};

export default function ReadMoreEksperiment(props: ReadMoreProps) {
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return <ReadMore header={tekst('header')}>Her står det mer om eksperimentet</ReadMore>;
}
