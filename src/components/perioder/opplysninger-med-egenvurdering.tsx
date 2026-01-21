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
        egenvurdering: 'Hva slags veiledning ønsker du?',
    },
    nn: {
        periode_started: 'Registrert seg som arbeidssøkjar',
        opplysninger: 'Opplysningar',
        egenvurdering: 'Kva slags rettleiing ønskjer du?',
    },
    en: {
        periode_started: 'Registered as job seeker',
        opplysninger: 'Information',
        egenvurdering: 'What kind of guidance do you want?',
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
                <Box data-testid="egenvurdering">
                    <div>
                        <b>{tekst('egenvurdering')}</b>
                    </div>
                    <div>{profileringsTekster(egenvurdering.egenvurdering)}</div>
                </Box>
            )}
        </>
    );
};

export { OpplysningerMedEgenvurdering };
