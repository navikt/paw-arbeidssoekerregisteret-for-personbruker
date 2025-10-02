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
        (sisteInformasjon?.opplysningerOmArbeidssoeker as OpplysningerOmArbeidssoker[]) ?? [],
    ) as OpplysningerMedProfilering;
    const harAntattGodeMuligheter = sisteOpplysninger.profilering?.profilertTil === ProfilertTil.ANTATT_GODE_MULIGHETER;

    if (!harAktivPeriode || !harAntattGodeMuligheter) {
        return null;
    }

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 0,
                right: '2rem',
                background: 'var(--a-bg-subtle)',
                padding: '2rem',
                boxShadow: 'var(--a-shadow-small)',
                border: '1px solid var(--a-surface-subtle)',
            }}
        >
            {/* @ts-ignore */}
            <skyra-survey slug={'arbeids-og-velferdsetaten-nav/test-undersokelse'} consent={false} />
        </div>
    );
}

export default InitSkyraSurvey;
