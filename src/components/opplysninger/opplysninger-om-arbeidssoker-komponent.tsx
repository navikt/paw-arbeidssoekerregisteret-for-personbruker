import {
    lagHentTekstForSprak,
    mapNusKodeTilUtdannignsnivaa,
    OpplysningerOmArbeidssoker,
    SPORSMAL_TEKSTER,
    SporsmalId,
    Svar,
    Sprak
} from '@navikt/arbeidssokerregisteret-utils';
import { BodyShort, Link } from '@navikt/ds-react';

import Oppfolging from './oppfolging';
import { BehovsvurderingResponse } from '../../../types/behovsvurdering';
import { loggAktivitet } from '@/lib/amplitude';
import { identity } from '@/lib/utils';
import Opplysninger from '@/components/opplysninger/opplysninger';

type Props = {
    opplysninger: OpplysningerOmArbeidssoker;
    sprak: Sprak;
    behovsvurdering: BehovsvurderingResponse;
    harAktivPeriode: boolean;
};

const TEKSTER = {
    nb: {
        opplysningerText1: 'Du kan  ',
        opplysningerText2: 'Veilederen din bruker opplysningene for å vurdere hvor mye veiledning du trenger.',
        endreOpplysninger: 'endre opplysninger her',
    },
};

function OpplysningerOmArbeidssokerKomponent(props: Props) {
    const { opplysninger, sprak, behovsvurdering, harAktivPeriode } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <>
            {harAktivPeriode && (
                <div className={'mb-5'}>
                    <BodyShort>
                        {tekst('opplysningerText1')}
                                <Link
                                    href={process.env.OPPDATER_OPPLYSNINGER_URL}
                                    variant="action"
                                    onClick={() => loggAktivitet({ aktivitet: 'Trykker på "Endre opplysninger"' })}
                                >
                                    {tekst('endreOpplysninger')}
                                </Link>
                                <br />


                        {tekst('opplysningerText2')}
                    </BodyShort>
                </div>
            )}
            <Oppfolging sprak={sprak} behovsvurdering={behovsvurdering} />
            <Opplysninger opplysninger={opplysninger} sprak={sprak} />
        </>
    );
}

export default OpplysningerOmArbeidssokerKomponent;
