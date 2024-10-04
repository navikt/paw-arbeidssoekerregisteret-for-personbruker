import { BodyShort, Box, Link } from '@navikt/ds-react';
import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { Sprak } from '../../contexts/sprak';
import { oppdaterOpplysningerLenke } from '../../urls';
import { loggAktivitet } from '../../lib/amplitude';
import LoggInViewport from '../logg-in-viewport';

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
                href={oppdaterOpplysningerLenke}
                onClick={() => loggAktivitet({ aktivitet: 'Trykker på "Legg til opplysninger"' })}
            >
                {tekst('linkText')}
            </Link>
            <LoggInViewport data={{ viser: 'Mangler opplysninger' }} />
        </Box>
    );
};

export default ManglerOpplysninger;
