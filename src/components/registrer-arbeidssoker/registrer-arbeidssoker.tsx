'use client';

import { LinkPanel } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { loggAktivitet } from '@/lib/amplitude';

interface Props extends React.HTMLProps<any> {
    registrerArbeidssokerUrl: string;
    sprak: Sprak
}

const TEKSTER = {
    nb: {
        tittel: 'Registrer deg som arbeidssøker',
    },
    nn: {
        tittel: 'Registrer deg som arbeidssøkjar',
    },
    en: {
        tittel: 'Register as a job seeker',
    }
};

export default function RegistrerArbeidssoker(props: Props) {
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return (
        <LinkPanel
            style={{ background: 'var(--a-surface-action-subtle)' }}
            href={props.registrerArbeidssokerUrl}
            className={props.className ?? ''}
            onClick={() => loggAktivitet({ aktivitet: 'Trykker på "Registrer deg som arbeidssøker"' })}
        >
            <LinkPanel.Title>{tekst('tittel')}</LinkPanel.Title>
        </LinkPanel>
    );
}
