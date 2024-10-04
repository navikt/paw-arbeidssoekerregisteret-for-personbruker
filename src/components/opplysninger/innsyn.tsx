import { lagHentTekstForSprak, Sprak, OpplysningerOmArbeidssoker } from '@navikt/arbeidssokerregisteret-utils';

import OpplysningerOmArbeidssokerKomponent from './opplysninger-om-arbeidssoker-komponent';
import { BehovsvurderingResponse } from '../../../types/behovsvurdering';

const TEKSTER = {
    nb: {
        headerAktiv: 'Endre eller se opplysninger fra registreringen',
        headerInnaktiv: 'Se opplysninger fra registreringen',
    },
    en: {
        headerAktiv: 'Change or see answers from the registration as job seeker',
        headerInnaktiv: 'See answers from the registration as job seeker',
    },
};

interface InnsynProps {
    sprak: Sprak;
    opplysninger: OpplysningerOmArbeidssoker;
    behovsvurdering: BehovsvurderingResponse;
    harAktivPeriode: boolean;
}

const InnsynLesMer = (props: InnsynProps) => {
    const { sprak, opplysninger, behovsvurdering } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const harAktivPeriode = props.harAktivPeriode;

    if (!Boolean(opplysninger?.periodeId)) {
        return null;
    }

    return (
        <OpplysningerOmArbeidssokerKomponent
                opplysninger={opplysninger}
                sprak={sprak}
                behovsvurdering={behovsvurdering}
                harAktivPeriode={harAktivPeriode}
        />
    );
};

export { InnsynLesMer };
