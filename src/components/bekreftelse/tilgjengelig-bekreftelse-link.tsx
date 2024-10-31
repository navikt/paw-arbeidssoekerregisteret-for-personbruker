'use client';

import { TilgjengeligeBekreftelser } from '../../../types/bekreftelse';
import NextLink from 'next/link';
import { LinkPanel } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { loggAktivitet } from '@/lib/amplitude';

interface Props {
    tilgjengeligeBekreftelser: TilgjengeligeBekreftelser;
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        title: 'Bekreft at du fortsatt vil være arbeidssøker',
        description: 'For å fortsatt være registrert som arbeidssøker hos Nav, må du bekrefte det her',
    },
};

const TilgjengeligBekreftelseLink = (props: Props) => {
    const { sprak, tilgjengeligeBekreftelser = [] } = props;

    if (tilgjengeligeBekreftelser.length === 0) {
        return null;
    }

    const onClick = (e: any) => {
        if (/^localhost:6006$/.test(document.location.host)) {
            e.preventDefault();
        }
        loggAktivitet({ aktivitet: 'Trykker på "Gå til Bekreftelse" fra forsiden' });
    };
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <LinkPanel href={`/bekreftelse`} onClick={onClick} as={NextLink}>
            <LinkPanel.Title>{tekst('title')}</LinkPanel.Title>
            <LinkPanel.Description>{tekst('description')}</LinkPanel.Description>
        </LinkPanel>
    );
};

export { TilgjengeligBekreftelseLink };
