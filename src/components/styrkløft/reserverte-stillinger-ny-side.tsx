import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { BodyShort, Link, LocalAlert } from '@navikt/ds-react';

import { loggDirektemeldtStillinger } from '@/lib/tracking';

interface Props {
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        tittel: 'Reserverte stillinger flytter til nav.no',
        innhold:
            'Vi flytter reserverte stillinger til Min side på nav.no. Der ligger de under Jobbmuligheter, hvor du kan se stillinger, melde interesse og se stillinger du har meldt interesse for.',
        lenkeTekst: 'Gå til jobbmuligheter på nav.no',
    },
    nn: {
        tittel: 'Reserverte stillingar blir flytta til nav.no',
        innhold:
            'Vi flyttar reserverte stillingar til Mi side på nav.no. Der ligg dei under Jobbtilbod, der du kan sjå stillingar, melde interesse og sjå stillingar du har meldt interesse for.',
        lenkeTekst: 'Gå til jobbtilbod på nav.no',
    },
    en: {
        tittel: 'Reserved jobs listings are moving to nav.no',
        innhold:
            'We are moving reserved jobs listings to My Page on nav.no. There, they will be available under Job Opportunities, where you can view jobs, express interest, and see the jobs you have expressed interest in.',
        lenkeTekst: 'Go to Job Opportunities at nav.no',
    },
};

function ReserverteStillingerHarNyLandingsside(props: Props) {
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const urlTilJobbmuligheter = 'http://www.nav.no/jobbmuligheter';

    return (
        <LocalAlert status="announcement" className="mb-4">
            <LocalAlert.Header>
                <LocalAlert.Title>{tekst('tittel')}</LocalAlert.Title>
            </LocalAlert.Header>
            <LocalAlert.Content>
                {tekst('innhold')}
                <BodyShort>
                    <Link
                        href={urlTilJobbmuligheter}
                        onClick={() => loggDirektemeldtStillinger({ aktivitet: 'Går til jobbmuligheter' })}
                    >
                        {tekst('lenkeTekst')}
                    </Link>
                </BodyShort>
            </LocalAlert.Content>
        </LocalAlert>
    );
}

export default ReserverteStillingerHarNyLandingsside;
