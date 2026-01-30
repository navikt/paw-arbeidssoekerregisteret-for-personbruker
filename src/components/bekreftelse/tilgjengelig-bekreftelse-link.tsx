'use client';

import NextLink from 'next/link';
import { Hide, LinkCard } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak, TilgjengeligeBekreftelser } from '@navikt/arbeidssokerregisteret-utils';
import tilSprakAvhengigAppPath from '@/lib/sprak-avhengig-url';
import { ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import LenkeTilBekreftelseArtikkel from '../lenke-til-bekreftelse-artikkel';
import { loggAktivitet } from '@/lib/tracking';

interface Props {
    tilgjengeligeBekreftelser: TilgjengeligeBekreftelser;
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        title: 'Bekreft at du vil være registrert som arbeidssøker hos Nav',
        iconTitle: 'Varseltrekant ikon',
    },
    nn: {
        title: 'Stadfest at du vil vera registrert som arbeidssøkjar hos Nav',
        iconTitle: 'Varseltrekant ikon',
    },
    en: {
        title: 'Confirm that you want to be registered as a jobseeker with Nav',
        iconTitle: 'Warning icon',
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
        <>
            <LinkCard style={{ background: 'var(--ax-bg-warning-moderate)' }}>
                <LinkCard.Icon>
                    <Hide below={'sm'}>
                        <ExclamationmarkTriangleFillIcon
                            title={tekst('iconTitle')}
                            style={{ color: 'var(--ax-bg-warning-strong)' }}
                        />
                    </Hide>
                </LinkCard.Icon>
                <LinkCard.Title className={'flex items-center'} as={'h3'}>
                    <LinkCard.Anchor asChild onClick={onClick}>
                        <NextLink href={tilSprakAvhengigAppPath('/bekreftelse', sprak)}>{tekst('title')}</NextLink>
                    </LinkCard.Anchor>
                </LinkCard.Title>
            </LinkCard>
            <LenkeTilBekreftelseArtikkel sprak={sprak} />
        </>
    );
};

export { TilgjengeligBekreftelseLink };
