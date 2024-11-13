import { hentSisteArbeidssokerPeriode, lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Heading } from '@navikt/ds-react';
import { ArbeidssokerperioderResponse } from '@navikt/arbeidssokerregisteret-utils/dist/models/arbeidssokerperiode';
import { OpplysningerOmArbeidssokerResponse } from '@navikt/arbeidssokerregisteret-utils/dist/models/opplysninger-om-arbeidssoker';

import { harPermittertSituasjon } from '@/lib/har-permittert-situasjon';

export const TEKSTER = {
    nb: {
        registrert: 'Du er registrert som arbeidssøker',
        registrertPermittert: 'Du er registrert som permittert arbeidssøker',
        ikkeRegistrert: 'Du er ikke registrert som arbeidssøker',
        ikkeRegistrertLenger: 'Du er ikke lenger registrert som arbeidssøker',
    },
    en: {
        registrert: 'You are registered as job seeker',
        registrertPermittert: 'You are registered as a temporarily layed off job seeker',
        ikkeRegistrert: 'You are not registered as job seeker',
        ikkeRegistrertLenger: 'You are no longer registered as job seeker',
    },
};

function hentTekstNokkel(harAktivArbeidssokerperiode: boolean, erPermittert: boolean, harIkkeHattArbeidssoekerperiode: boolean) {
    if(harIkkeHattArbeidssoekerperiode) {
        return 'ikkeRegistrert';
    }

    if (!harAktivArbeidssokerperiode) {
        return 'ikkeRegistrertLenger';
    }

    if (erPermittert) {
        return 'registrertPermittert';
    }

    return 'registrert';
}

interface Props {
    sprak: Sprak;
    arbeidssoekerperioder: ArbeidssokerperioderResponse;
    opplysningerOmArbeidssoeker: OpplysningerOmArbeidssokerResponse;
}

const RegistrertTittel = (props: Props) => {
    const { arbeidssoekerperioder, opplysningerOmArbeidssoeker, sprak } = props;

    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const periode = hentSisteArbeidssokerPeriode(arbeidssoekerperioder);
    const harIkkeHattArbeidssoekerperiode = arbeidssoekerperioder.length === 0
    const harAktivArbeidssokerperiode = arbeidssoekerperioder.length > 0 && !Boolean(periode.avsluttet);
    const erPermittert = harPermittertSituasjon(opplysningerOmArbeidssoeker);

    return (
        <Heading level={'1'} size={'xlarge'}>
            {tekst(hentTekstNokkel(harAktivArbeidssokerperiode, erPermittert, harIkkeHattArbeidssoekerperiode))}
        </Heading>
    );
};

export default RegistrertTittel;
