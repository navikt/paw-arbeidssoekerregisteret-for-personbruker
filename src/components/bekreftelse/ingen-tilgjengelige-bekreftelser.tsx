import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Alert } from '@navikt/ds-react';
import LenkeTilBekreftelseArtikkel from '../lenke-til-bekreftelse-artikkel';

interface Props {
    sprak: Sprak;
}
const TEKSTER = {
    nb: {
        melding: 'Du har ingen bekreftelser å sende inn',
    },
    nn: {
        melding: 'Du har ingen stadfestingar å senda inn',
    },
    en: {
        melding: 'You have no confirmation forms to submit',
    },
};

export default function IngenTilgjengeligeBekreftelser(props: Props) {
    const tekst = lagHentTekstForSprak(TEKSTER, props.sprak);
    return (
        <>
            <Alert variant={'info'}>{tekst('melding')}</Alert>
            <LenkeTilBekreftelseArtikkel sprak={props.sprak} />
        </>
    );
}
