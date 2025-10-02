'use client';

import { useFeatureToggles } from '@/contexts/feature-toggle-context';
import unleashKeys from '@/unleash-keys';

import {
    AggregertePerioder,
    hentSisteOpplysningerOmArbeidssoker,
    OpplysningerMedProfilering,
    OpplysningerOmArbeidssoker,
    ProfilertTil,
} from '@navikt/arbeidssokerregisteret-utils';

interface Props {
    aggregerteData: AggregertePerioder | undefined;
}

function InitSkyraSurvey(props: Props) {
    const toggles = useFeatureToggles();
    if (!toggles[unleashKeys.BRUK_SKYRA] || !props.aggregerteData) {
        return null;
    }

    const sisteInformasjon = props.aggregerteData[0];
    const harAktivPeriode = Boolean(sisteInformasjon?.periodeId) && !Boolean(sisteInformasjon?.avsluttet);
    const sisteOpplysninger = hentSisteOpplysningerOmArbeidssoker(
        sisteInformasjon?.opplysningerOmArbeidssoeker as OpplysningerOmArbeidssoker[] ?? [],
    ) as OpplysningerMedProfilering;
    const harAntattGodeMuligheter = sisteOpplysninger.profilering?.profilertTil === ProfilertTil.ANTATT_GODE_MULIGHETER;

    if (!harAktivPeriode || !harAntattGodeMuligheter) {
        return null;
    }

    // @ts-ignore
    return <skyra-survey slug={'arbeids-og-velferdsetaten-nav/test-undersokelse'} consent={false} />;
}

export default InitSkyraSurvey;
