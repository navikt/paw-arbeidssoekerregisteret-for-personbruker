import { AggregertePerioder, lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Heading } from '@navikt/ds-react';

import { harPermittertSituasjon } from '@/lib/har-permittert-situasjon';

export const TEKSTER = {
    nb: {
        registrert: 'Du er registrert som arbeidssøker',
        registrertPermittert: 'Du er registrert som permittert arbeidssøker',
        ikkeRegistrert: 'Du er ikke registrert som arbeidssøker',
        ikkeRegistrertLenger: 'Du er ikke lenger registrert som arbeidssøker',
    },
    nn: {
        registrert: 'Du er registrert som arbeidssøkjar',
        registrertPermittert: 'Du er registrert som permittert arbeidssøkjar',
        ikkeRegistrert: 'Du er ikkje registrert som arbeidssøkjar',
        ikkeRegistrertLenger: 'Du er ikkje lenger registrert som arbeidssøkjar',
    },
    en: {
        registrert: 'You are registered as jobseeker',
        registrertPermittert: 'You are registered as a temporarily layed off jobseeker',
        ikkeRegistrert: 'You are not registered as jobseeker',
        ikkeRegistrertLenger: 'You are no longer registered as jobseeker',
    },
};

function hentTekstNokkel(
    harAktivArbeidssokerperiode: boolean,
    erPermittert: boolean,
    harIkkeHattArbeidssoekerperiode: boolean,
) {
    if (harIkkeHattArbeidssoekerperiode) {
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
    const harAktivArbeidssokerperiode = aggregertePerioder.length > 0 && !Boolean(aggregertePerioder[0]?.avsluttet);
    const erPermittert =
        aggregertePerioder.length > 0 && harPermittertSituasjon(aggregertePerioder[0]?.opplysningerOmArbeidssoeker);

    return (
        <Heading level={'1'} size={'xlarge'}>
            {tekst(hentTekstNokkel(harAktivArbeidssokerperiode, erPermittert, harIkkeHattArbeidssoekerperiode))}
        </Heading>
    );
};

export default RegistrertTittel;
