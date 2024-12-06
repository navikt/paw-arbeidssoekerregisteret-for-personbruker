'use client';

import { Alert } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { useEffect } from 'react';
import { loggVisning } from '@/lib/amplitude';

interface Props {
    sprak: Sprak;
    error: string;
}

const TEKSTER = {
    nb: {
        melding: 'Noe gikk dessverre galt'
    },
    nn: {
        melding: 'Noko gikk dessverre galt',
    },
    en: {
        melding: 'We\'re sorry, an error occured'
    }
}

function Feil(props: Props) {
    const { sprak, error } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak)

    useEffect(() => {
        loggVisning({ viser: 'ErrorBoundaryFeil', error });
    }, []);

    return <Alert variant={'error'}>{tekst('melding')}</Alert>
}

export default Feil;
