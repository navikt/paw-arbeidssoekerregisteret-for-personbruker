import { AggregertePerioder, lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Heading } from '@navikt/ds-react';

import { harPermittertSituasjon } from '@/lib/har-permittert-situasjon';
import { Snapshot } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';

const TEKSTER = {
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
    snapshot: Snapshot | undefined;
}

const RegistrertTittel = (props: Props) => {
    const { snapshot, sprak } = props;

    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const harIkkeHattArbeidssoekerperiode = !Boolean(snapshot);
    const harAktivArbeidssokerperiode = Boolean(snapshot) && !Boolean(snapshot!.avsluttet);
    const erPermittert = Boolean(snapshot?.opplysning) && harPermittertSituasjon(snapshot!.opplysning!);

    return (
        <Heading level={'1'} size={'xlarge'}>
            {tekst(hentTekstNokkel(harAktivArbeidssokerperiode, erPermittert, harIkkeHattArbeidssoekerperiode))}
        </Heading>
    );
};

export default RegistrertTittel;
