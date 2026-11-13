'use client';

import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Box, LinkCard } from '@navikt/ds-react';
import { loggAktivitet } from '@/lib/tracking';

interface Props {
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

    return (
        <Box>
            <Box asChild background="accent-moderate">
                <LinkCard>
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
        </Box>
    );
}
