'use client';

import { Box, Link } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { loggAktivitet } from '@/lib/tracking/logg-aktivitet';

const TEKSTER = {
    nb: {
       linkText: 'Les mer om å bekrefte at du vil være arbeidssøker',
    },
    nn: {
        linkText: 'Les meir om å stadfesta at du vil vera arbeidssøkjar',
    },
    en: {
        linkText: 'Read more about confirming that you will be a jobseeker',
    },
};

interface Props {
    sprak: Sprak;
}
const getUrl = (sprak: Sprak) => {
    if (sprak === 'en') {
        return 'https://www.nav.no/confirm-jobseeker/en';
    } else if (sprak === 'nn') {
        return 'https://www.nav.no/bekreft-arbeidssoker/nn';
    } else {
        return 'https://www.nav.no/bekreft-arbeidssoker';
    }
};

const LenkeTilBekreftelseArtikkel = (props: Props) => {
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    const onClick = () => {
        loggAktivitet({
            aktivitet:
                'Trykker på "Les mer om å bekrefte at du vil være arbeidssøker"',
        });
    };

    return (
        <Box className={'mb-2 mt-2'}>
          <Link href={getUrl(sprak)} onClick={onClick}>
              {tekst('linkText')}
          </Link>
        </Box>
    );
};

export default LenkeTilBekreftelseArtikkel;
