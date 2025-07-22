'use client';

import { Box, Link } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';

import { useLoggAktivitet } from '@/lib/tracking/logg-aktivitet';
import tilSprakAvhengigAppPath from '@/lib/sprak-avhengig-url';

export interface HistorikkLenkeProps {
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        lenkeTekst: 'Se tidligere registreringer og opplysninger',
    },
    nn: {
        lenkeTekst: 'Sjå tidlegare registreringar og opplysningar',
    },
    en: {
        lenkeTekst: 'View previous registrations and information',
    },
};

export function SeHistorikkLenke(props: HistorikkLenkeProps) {
    const { sprak } = props;
    const loggAktivitet = useLoggAktivitet();
    function loggKlikk() {
        loggAktivitet({ aktivitet: 'Går til siden for historikk' });
    }

    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Box className="text-right mb-8">
            <Link href={`/arbeidssoekerregisteret${tilSprakAvhengigAppPath('/historikk', sprak)}`} onClick={loggKlikk}>
                {tekst('lenkeTekst')}
            </Link>
        </Box>
    );
}
