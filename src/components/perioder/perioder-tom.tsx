'use client';

import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { LocalAlert } from '@navikt/ds-react';

const TEKSTER = {
    nb: {
        tittel: 'Ingen historikk funnet',
        innhold: 'Du har ingen registrert arbeidssøkerhistorikk hos oss.',
    },
    nn: {
        tittel: 'Ingen historikk funnen',
        innhold: 'Du har ingen registrert arbeidssøkjarhistorikk hos oss.',
    },
    en: {
        tittel: 'No history found',
        innhold: 'You have no registered jobseeker history with us.',
    },
};

const PerioderTom = ({ sprak }: { sprak: Sprak }) => {
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <LocalAlert status="announcement">
            <LocalAlert.Header>
                <LocalAlert.Title>{tekst('tittel')}</LocalAlert.Title>
            </LocalAlert.Header>
            <LocalAlert.Content>{tekst('innhold')}</LocalAlert.Content>
        </LocalAlert>
    );
};

export { PerioderTom };
