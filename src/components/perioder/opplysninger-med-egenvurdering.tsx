import React from 'react';
import { Opplysninger } from './opplysninger';
import { Box } from '@navikt/ds-react';
import { EgenvurderingHendelse, OpplysningerHendelse } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { PROFILERT_TIL_TEKSTER } from './models';

const TEKSTER = {
    nb: {
        periode_started: 'Registrert som arbeidssøker',
        opplysninger: 'Opplysninger',
        egenvurdering: 'Egenvurdering',
    },
    nn: {
        periode_started: 'Registrert seg som arbeidssøkjar',
        opplysninger: 'Opplysningar',
        egenvurdering: 'Egenvurdering',
    },
    en: {
        periode_started: 'Registered as job seeker',
        opplysninger: 'Information',
        egenvurdering: 'Self-assessment',
    },
};

type OpplysningerMedEgenvurderingProps = {
    opplysninger: OpplysningerHendelse;
    egenvurdering?: EgenvurderingHendelse;
    sprak: Sprak;
};

const OpplysningerMedEgenvurdering: React.FC<OpplysningerMedEgenvurderingProps> = (props) => {
    const { opplysninger, egenvurdering, sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const profileringsTekster = lagHentTekstForSprak(PROFILERT_TIL_TEKSTER, sprak);

    return (
        <>
            <Opplysninger opplysninger={opplysninger} sprak={sprak} />
            {egenvurdering && (
                <Box as={'p'}>
                    <b>{tekst('egenvurdering')}</b>
                    {': '}
                    {profileringsTekster(egenvurdering.egenvurdering)}
                </Box>
            )}
        </>
    );
};

export { OpplysningerMedEgenvurdering };
