'use client';

import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Box, HStack, Link } from '@navikt/ds-react';
import { tilSprakAvhengigAppPath } from '@/lib/sprak-avhengig-url';
import { loggAktivitet } from '@/lib/tracking';

interface HistorikkLenkeProps {
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

    function loggKlikk() {
        loggAktivitet({ aktivitet: 'Går til siden for historikk' });
    }

    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Box asChild marginBlock="space-0 space-32">
            <HStack justify="end">
                <Link
                    href={`/arbeidssoekerregisteret${tilSprakAvhengigAppPath('/historikk', sprak)}`}
                    onClick={loggKlikk}
                >
                    {tekst('lenkeTekst')}
                </Link>
            </HStack>
        </Box>
    );
}
