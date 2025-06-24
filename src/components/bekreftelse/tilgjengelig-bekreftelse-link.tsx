'use client';

import { TilgjengeligeBekreftelser } from '../../../types/bekreftelse';
import NextLink from 'next/link';
import { Hide, LinkPanel } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { loggAktivitet } from '@/lib/amplitude';
import tilSprakAvhengigAppPath from '@/lib/sprak-avhengig-url';
import { ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import LenkeTilBekreftelseArtikkel from '../lenke-til-bekreftelse-artikkel';
import styles from './tilgjengelig-bekreftelse-link.module.css';

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
            <LinkPanel
                className={styles.tilgjengeligBekreftelseLink}
                style={{ background: 'var(--a-surface-warning-subtle)' }}
                href={tilSprakAvhengigAppPath('/bekreftelse', sprak)}
                onClick={onClick}
                as={NextLink}
            >
                <LinkPanel.Title className={'flex items-center'}>
                    <Hide below={'sm'}>
                        <ExclamationmarkTriangleFillIcon
                            title={tekst('iconTitle')}
                            className={`mr-4 ${styles.ikon}`}
                            style={{ color: 'var(--a-icon-warning)' }}
                        />
                    </Hide>
                    {tekst('title')}
                </LinkPanel.Title>
            </LinkPanel>
            <LenkeTilBekreftelseArtikkel sprak={sprak} />
        </>
    );
};

export { TilgjengeligBekreftelseLink };
