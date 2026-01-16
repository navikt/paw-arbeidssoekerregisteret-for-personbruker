'use client';

import { Box, Link } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';

import tilSprakAvhengigAppPath from '@/lib/sprak-avhengig-url';
import { loggAktivitet } from '@/lib/tracking';
import { useFeatureToggles } from '@/contexts/feature-toggle-context';
import unleashKeys from '@/unleash-keys';

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
    const featureToggles = useFeatureToggles();
    const visNyHistorikkLenke = featureToggles[unleashKeys.VIS_NY_HISTORIKK];
    const historikkLink = visNyHistorikkLenke ? '/historikk-v2' : '/historikk';

    function loggKlikk() {
        loggAktivitet({ aktivitet: 'Går til siden for historikk' });
    }

    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Box className="text-right mb-8">
            <Link href={`/arbeidssoekerregisteret${tilSprakAvhengigAppPath(historikkLink, sprak)}`} onClick={loggKlikk}>
                {tekst('lenkeTekst')}
            </Link>
        </Box>
    );
}
