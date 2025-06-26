import { hentSisteArbeidssokerPeriode, lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Heading } from '@navikt/ds-react';
import {
    ArbeidssokerPeriode,
    ArbeidssokerperioderResponse
} from '@navikt/arbeidssokerregisteret-utils/dist/models/arbeidssokerperiode';
import { OpplysningerOmArbeidssokerResponse } from '@navikt/arbeidssokerregisteret-utils/dist/models/opplysninger-om-arbeidssoker';

import { harPermittertSituasjon } from '@/lib/har-permittert-situasjon';
import { AggregertePerioder } from '../../../types/aggregerte-perioder';

export const TEKSTER = {
    nb: {
        registrert: 'Du er registrert som arbeidssøker',
        registrertPermittert: 'Du er registrert som permittert arbeidssøker',
        ikkeRegistrert: 'Du er ikke registrert som arbeidssøker',
        ikkeRegistrertLenger: 'Du er ikke lenger registrert som arbeidssøker',
    },
    en: {
        registrert: 'You are registered as jobseeker',
        registrertPermittert: 'You are registered as a temporarily layed off jobseeker',
        ikkeRegistrert: 'You are not registered as jobseeker',
        ikkeRegistrertLenger: 'You are no longer registered as jobseeker',
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
    aggregertePerioder: AggregertePerioder;
}

const RegistrertTittel = (props: Props) => {
    const { aggregertePerioder, sprak } = props;

    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const harIkkeHattArbeidssoekerperiode = aggregertePerioder.length === 0;
    const harAktivArbeidssokerperiode = aggregertePerioder.length > 0 && !Boolean(aggregertePerioder[0].avsluttet);
    const erPermittert = harPermittertSituasjon(aggregertePerioder[0]?.opplysningerOmArbeidssoeker);

    return (
        <Heading level={'1'} size={'xlarge'}>
            {tekst(hentTekstNokkel(harAktivArbeidssokerperiode, erPermittert, harIkkeHattArbeidssoekerperiode))}
        </Heading>
    );
};

export default RegistrertTittel;
