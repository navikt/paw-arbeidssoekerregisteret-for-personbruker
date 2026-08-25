import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { BodyShort, Link, LocalAlert } from '@navikt/ds-react';

interface Props {
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        tittel: 'Reserverte stillinger flytter til nav.no',
        innhold:
            'Vi flytter reserverte stillinger til Min side på nav.no. Der ligger de under Jobbmuligheter, hvor du kan se stillinger, melde interesse og se stillinger du har meldt interesse for.',
        lenkeTekst: 'Se reserverte stillinger på nav.no',
    },
    nn: {
        tittel: 'Reserverte stillingar blir flytta til nav.no',
        innhold:
            'Vi flyttar reserverte stillingar til Mi side på nav.no. Der ligg dei under Jobbmoglegheiter, der du kan sjå stillingar, melde interesse og sjå stillingar du har meldt interesse for.',
        lenkeTekst: 'Sjå reserverte stillingar på nav.no',
    },
    en: {
        tittel: 'Reserved Job Listings are moving to nav.no',
        innhold:
            'We are moving reserved job listings to My Page on nav.no. There, they will be available under Job Opportunities, where you can view positions, express interest, and see the jobs you have expressed interest in.',
        lenkeTekst: 'See reserved job listings on nav.no',
    },
};

function ReserverteStillingerHarNyLandingsside(props: Props) {
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <LocalAlert status="announcement">
            <LocalAlert.Header>
                <LocalAlert.Title>{tekst('tittel')}</LocalAlert.Title>
            </LocalAlert.Header>
            <LocalAlert.Content>
                {tekst('innhold')}
                <BodyShort>
                    <Link href="">{tekst('lenkeTekst')}</Link>
                </BodyShort>
            </LocalAlert.Content>
        </LocalAlert>
    );
}

export default ReserverteStillingerHarNyLandingsside;
