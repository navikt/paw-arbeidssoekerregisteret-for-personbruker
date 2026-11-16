'use client';

import { ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import { lagHentTekstForSprak, type Sprak, type TilgjengeligeBekreftelser } from '@navikt/arbeidssokerregisteret-utils';
import { Box, Hide, HStack, LinkCard } from '@navikt/ds-react';
import NextLink from 'next/link';
import { tilSprakAvhengigAppPath } from '@/lib/sprak-avhengig-url';
import { loggAktivitet } from '@/lib/tracking';
import LenkeTilBekreftelseArtikkel from '../lenke-til-bekreftelse-artikkel';

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
            <Box asChild background="warning-moderate">
                <LinkCard>
                    <LinkCard.Icon data-color="warning">
                        <Hide below={'sm'}>
                            <ExclamationmarkTriangleFillIcon title={tekst('iconTitle')} />
                        </Hide>
                    </LinkCard.Icon>
                    <HStack asChild align="center">
                        <LinkCard.Title as="h2">
                            <LinkCard.Anchor asChild onClick={onClick}>
                                <NextLink href={tilSprakAvhengigAppPath('/bekreftelse', sprak)}>
                                    {tekst('title')}
                                </NextLink>
                            </LinkCard.Anchor>
                        </LinkCard.Title>
                    </HStack>
                </LinkCard>
            </Box>
            <LenkeTilBekreftelseArtikkel sprak={sprak} />
        </>
    );
};

export { TilgjengeligBekreftelseLink };
