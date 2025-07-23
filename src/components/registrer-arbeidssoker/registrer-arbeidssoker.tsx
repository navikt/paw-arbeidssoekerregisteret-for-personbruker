'use client';

import { Box, LinkCard } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { useLoggAktivitet } from '@/hooks/use-logg-aktivitet';

interface Props extends React.HTMLProps<any> {
    registrerArbeidssokerUrl: string;
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        tittel: 'Registrer deg som arbeidssøker',
    },
    nn: {
        tittel: 'Registrer deg som arbeidssøkjar',
    },
    en: {
        tittel: 'Register as a jobseeker',
    },
};

export default function RegistrerArbeidssoker(props: Props) {
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const loggAktivitet = useLoggAktivitet();

    return (
        <Box>
            <LinkCard style={{ background: 'var(--a-surface-action-subtle)' }} className={props.className ?? ''}>
                <LinkCard.Title>
                    <LinkCard.Anchor
                        href={props.registrerArbeidssokerUrl}
                        onClick={() => loggAktivitet({ aktivitet: 'Trykker på "Registrer deg som arbeidssøker"' })}
                    >
                        {tekst('tittel')}
                    </LinkCard.Anchor>
                </LinkCard.Title>
            </LinkCard>
        </Box>
    );
}
