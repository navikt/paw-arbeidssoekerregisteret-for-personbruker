import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Alert } from '@navikt/ds-react';

const TEKSTER = {
    nb: { melding: 'Noe gikk dessverre galt. Forsøk igjen, eller kontakt Nav.' },
    nn: { melding: 'Noko gjekk dessverre gale. Prøv igjen, eller kontakt Nav.' },
    en: { melding: 'Something went wrong. Please try again or contact Nav.' },
};

interface Props {
    sprak?: Sprak;
}

export default function Feilmelding({ sprak = 'nb' }: Props) {
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Alert variant={'error'} className={'my-8'}>
            {tekst('melding')}
        </Alert>
    );
}
