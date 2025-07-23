import { AktivitetData } from '@/lib/tracking/common';
import { logUmamiEvent } from '@/lib/tracking/umami';
import { logAmplitudeEvent } from '@/lib/tracking/amplitude';
import unleashKeys from '@/unleash-keys';
import { useFeatureToggles } from '@/contexts/feature-toggle-context';

export function useLoggAktivitet() {
    const toggles = useFeatureToggles();
    const brukUmami = toggles[unleashKeys.BRUK_UMAMI];
    return (data: AktivitetData) => {
        const eventData = data || ({} as AktivitetData);
        const trackingFn = brukUmami ? logUmamiEvent : logAmplitudeEvent;
        trackingFn('arbeidssoekerregisteret-for-personbruker.aktivitet', eventData);
    };
}
