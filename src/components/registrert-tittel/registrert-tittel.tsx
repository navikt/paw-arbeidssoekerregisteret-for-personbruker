import { hentSisteArbeidssokerPeriode, lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { harPermittertSituasjon } from '../../lib/har-permittert-situasjon';
import { Heading } from '@navikt/ds-react';
import { ArbeidssokerperioderResponse } from '@navikt/arbeidssokerregisteret-utils/dist/models/arbeidssokerperiode';
import { OpplysningerOmArbeidssokerResponse } from '@navikt/arbeidssokerregisteret-utils/dist/models/opplysninger-om-arbeidssoker';

export const TEKSTER = {
    nb: {
        registrert: 'Du er registrert som arbeidssøker',
        registrertPermittert: 'Du er registrert som permittert arbeidssøker',
        ikkeRegistrert: 'Du er ikke registrert som arbeidssøker',
    },
    en: {
        registrert: 'You are registered as job seeker',
        registrertPermittert: 'You are registered as a temporarily layed off job seeker',
        ikkeRegistrert: 'You are not registered as job seeker',
    },
};

function hentTekstNokkel(harAktivArbeidssokerperiode: boolean, erPermittert: boolean) {
    if (!harAktivArbeidssokerperiode) {
        return 'ikkeRegistrert';
    }

    if (erPermittert) {
        return 'registrertPermittert';
    }

    return 'registrert';
}

interface Props {
    sprak: Sprak;
    arbeidssokerperioder: ArbeidssokerperioderResponse;
    opplysningerOmArbeidssoker: OpplysningerOmArbeidssokerResponse;
}

const RegistrertTittel = (props: Props) => {
    const { arbeidssokerperioder, opplysningerOmArbeidssoker, sprak } = props;

    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const periode = hentSisteArbeidssokerPeriode(arbeidssokerperioder);
    const harAktivArbeidssokerperiode = arbeidssokerperioder.length > 0 && !Boolean(periode.avsluttet);
    const erPermittert = harPermittertSituasjon(opplysningerOmArbeidssoker);

    return (
        <Heading level={'2'} size={'small'}>
            {tekst(hentTekstNokkel(harAktivArbeidssokerperiode, erPermittert))}
        </Heading>
    );
};

export default RegistrertTittel;
