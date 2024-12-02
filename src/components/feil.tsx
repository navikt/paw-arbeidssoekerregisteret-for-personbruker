'use client';

import { Alert } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { useEffect } from 'react';
import { loggVisning } from '@/lib/amplitude';

interface Props {
    sprak: Sprak;
    error: any;
}

const TEKSTER = {
    nb: {
        melding: 'Noe gikk dessverre galt'
    }
}

function Feil(props: Props) {
    const { sprak, error } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak)

    useEffect(() => {
        loggVisning({ viser: 'ErrorBoundaryFeil', error: error?.message });
    }, []);

    return <Alert variant={'error'}>{tekst('melding')}</Alert>
}

export default Feil;
