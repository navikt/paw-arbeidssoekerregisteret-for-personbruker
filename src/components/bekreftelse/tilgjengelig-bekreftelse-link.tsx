'use client';

import { TilgjengeligeBekreftelser } from '../../../types/bekreftelse';
import NextLink from 'next/link';
import { LinkPanel } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { loggAktivitet } from '@/lib/amplitude';
import tilSprakAvhengigAppPath from '@/lib/sprak-avhengig-url';
import { ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import styles from './tilgjengelig-bekreftelse-link.module.css';

interface Props {
    tilgjengeligeBekreftelser: TilgjengeligeBekreftelser;
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        title: 'Bekreft at du fortsatt vil være arbeidssøker',
    },
    nn: {
        title: 'Stadfest at du framleis vil vera arbeidssøkjar',
    },
    en: {
        title: 'Confirm that you will still be a job seeker',
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
        <LinkPanel
            className={styles.tilgjengeligBekreftelseLink}
            style={{ background: 'var(--a-surface-warning-subtle)' }}
            href={tilSprakAvhengigAppPath('/bekreftelse', sprak)}
            onClick={onClick}
            as={NextLink}
        >
            <LinkPanel.Title className={'flex items-center'}>
                <ExclamationmarkTriangleFillIcon
                    className={`mr-4 ${styles.ikon}`}
                    style={{ color: 'var(--a-icon-warning)'}}
                />
                {tekst('title')}</LinkPanel.Title>
        </LinkPanel>
    );
};

export { TilgjengeligBekreftelseLink };
