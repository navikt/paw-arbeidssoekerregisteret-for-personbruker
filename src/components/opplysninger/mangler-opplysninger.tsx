import { BodyShort, Box, Link } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { loggAktivitet } from '@/lib/amplitude';

interface ManglerOpplysningerProps {
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        header: 'Du har registrert deg som arbeidssøker, men ikke lagt til opplysninger enda.',
        linkText: 'Legg til opplysninger',
    },
};

const ManglerOpplysninger = (props: ManglerOpplysningerProps) => {
    const tekst = lagHentTekstForSprak(TEKSTER, props.sprak);

    return (
        <Box>
            <BodyShort>{tekst('header')}</BodyShort>
            <Link
                href={process.env.NEXT_PUBLIC_OPPDATER_OPPLYSNINGER_URL}
                onClick={() => loggAktivitet({ aktivitet: 'Trykker på "Legg til opplysninger"' })}
            >
                {tekst('linkText')}
            </Link>
        </Box>
    );
};

export default ManglerOpplysninger;
