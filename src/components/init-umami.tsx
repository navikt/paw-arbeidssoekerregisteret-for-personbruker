'use client';

import { useFeatureToggles } from '@/contexts/feature-toggle-context';
import unleashKeys from '@/unleash-keys';
import Script from 'next/script';

interface Props {
    trackingId: string;
}

const InitUmami = (props: Props) => {
    const featureToggles = useFeatureToggles();
    if (!featureToggles[unleashKeys.BRUK_UMAMI]) {
        return null;
    }

    return (
        <Script
            defer
            strategy="afterInteractive"
            src="https://cdn.nav.no/team-researchops/sporing/sporing.js"
            data-host-url="https://umami.nav.no"
            data-website-id={props.trackingId}
        ></Script>
    );
};

export default InitUmami;
