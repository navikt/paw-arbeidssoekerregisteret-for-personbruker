import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Alert } from '@navikt/ds-react';

interface Props {
    sprak: Sprak;
}
const TEKSTER = {
    nb: {
        melding: 'Det er ingen tilgjengelige bekreftelser å sende inn',
    },
    nn: {
        melding: 'Det er ingen tilgjengelege stadfestingar å senda inn',
    },
    en: {
        melding: 'No confirmation forms available at the moment'
    }
};

export default function IngenTilgjengeligeBekreftelser(props: Props) {
    const tekst = lagHentTekstForSprak(TEKSTER, props.sprak);
    return <Alert variant={'info'}>{tekst('melding')}</Alert>;
}
