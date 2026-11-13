import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Box, LocalAlert } from '@navikt/ds-react';

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
        <Box marginBlock="space-32" asChild>
            <LocalAlert status="error" as="div">
                <LocalAlert.Header>
                    <LocalAlert.Title as="div">{tekst('melding')}</LocalAlert.Title>
                </LocalAlert.Header>
            </LocalAlert>
        </Box>
    );
}
