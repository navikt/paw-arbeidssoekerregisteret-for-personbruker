'use client';

import { Box, Link } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';

import { loggAktivitet } from '@/lib/amplitude';
import tilSprakAvhengigAppPath from '@/lib/sprak-avhengig-url';

export interface HistorikkLenkeProps {
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        lenkeTekst: 'Se tidligere registreringer og opplysninger',
    },
    nn: {
        lenkeTekst: 'Se tidligere registreringer og opplysninger',
    },
    en: {
        lenkeTekst: 'Se tidligere registreringer og opplysninger',
    },
};

async function loggKlikk() {
    loggAktivitet({ aktivitet: 'Går til siden for historikk' });
    console.log('du klikka mæ');
}

export function SeHistorikkLenke(props: HistorikkLenkeProps) {
    const { sprak } = props;

    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Box className="text-right mb-8">
            <Link href={`/arbeidssoekerregisteret${tilSprakAvhengigAppPath('/historikk', sprak)}`} onClick={loggKlikk}>
                {tekst('lenkeTekst')}
            </Link>
        </Box>
    );
}
