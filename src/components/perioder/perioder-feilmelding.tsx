'use client';

import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { LocalAlert } from '@navikt/ds-react';

const TEKSTER = {
    nb: {
        tittel: 'Noe gikk galt',
        innhold: 'Vi klarte dessverre ikke å hente arbeidssøkerhistorikken din.',
    },
    nn: {
        tittel: 'Noko gjekk gale',
        innhold: 'Me klarte dessverre ikkje å henta arbeidssøkjarhistorikken din.',
    },
    en: {
        tittel: 'Something went wrong',
        innhold: "Unfortunately, we couldn't retrieve your jobseeker history.",
    },
};

const PerioderFeilmelding = ({ sprak }: { sprak: Sprak }) => {
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <LocalAlert status="error">
            <LocalAlert.Header>
                <LocalAlert.Title>{tekst('tittel')}</LocalAlert.Title>
            </LocalAlert.Header>
            <LocalAlert.Content>{tekst('innhold')}</LocalAlert.Content>
        </LocalAlert>
    );
};

export { PerioderFeilmelding };
