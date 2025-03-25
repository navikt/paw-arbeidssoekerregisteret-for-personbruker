'use client';

import { Alert, BodyLong, Heading, Link } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { loggAktivitet } from '@/lib/amplitude';

const TEKSTER = {
    nb: {
        heading: 'Endring for deg som sender meldekort',
        bodyText1:
            '20. mars ble det innført endringer for deg som er registrert som arbeidssøker hos Nav. Hver 14. dag vil du få en oppgave på Min side der du bekrefter at du fortsatt vil være registrert som arbeidssøker. Fristene vil være de samme som i dag.',
        linkText: 'Les mer om å bekrefte at du vil være arbeidssøker',
    },
    nn: {
        heading: 'Endring for deg som sender meldekort',
        bodyText1:
            '20. mars vart det innført endringar for deg som er registrert som arbeidssøkjar hos Nav. Kvar 14. dag vil du få ei oppgåve på Min side der du stadfestar at du framleis vil vera registrert som arbeidssøkjar. Fristane vil vera dei same som i dag.',
        linkText: 'Les meir om å stadfesta at du vil vera arbeidssøkjar',
    },
    en: {
        heading: 'Change for those who send employment status form',
        bodyText1:
            'On March 20th, changes were introduced for you who are registered as a jobseeker with Nav. Every 14 days you will receive a task on My Page where you confirm that you will still be registered as a jobseeker. The deadlines will be the same as today.',
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

const EndringAlert = (props: Props) => {
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    const onClick = () => {
        loggAktivitet({
            aktivitet:
                'Trykker på "Les mer om å bekrefte at du vil være arbeidssøker" på nav.no fra varsel på forsiden',
        });
    };

    return (
        <Alert variant={'info'} className={'mb-4'}>
            <Heading spacing size="small" level="3">
                {tekst('heading')}
            </Heading>
            <BodyLong spacing>{tekst('bodyText1')}</BodyLong>
            <BodyLong>
                <Link href={getUrl(sprak)} onClick={onClick}>
                    {tekst('linkText')}
                </Link>
            </BodyLong>
        </Alert>
    );
};

export default EndringAlert;
