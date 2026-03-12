'use client';

import { useFeatureToggles } from '@/contexts/feature-toggle-context';
import unleashKeys from '@/unleash-keys';
import { UxSignalsComponent, UxSignalsWidgetProps } from '@/components/ux-signals/ux-signals-component';

export default function UxSignalsClientSideWidget(props: UxSignalsWidgetProps) {
    const { erDemo } = props;
    const toggles = useFeatureToggles();
    const erUndersoekelseAktiv = toggles[unleashKeys.BRUK_UXSIGNALS];

    if (!erUndersoekelseAktiv) return null;

    return <UxSignalsComponent erDemo={erDemo} className={props.className} />;
}
