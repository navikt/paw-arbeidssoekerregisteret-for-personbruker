import { AktivitetData } from '@/lib/tracking/common';
import { logUmamiEvent } from '@/lib/tracking/umami';
import { logAmplitudeEvent } from '@/lib/tracking/amplitude';
import { useEffect, useState } from 'react';
import unleashKeys from '@/unleash-keys';

export function useLoggAktivitet() {
    const [brukUmami, settBrukUmami] = useState<boolean>(false);

    useEffect(() => {
        async function fetchToggles() {
            try {
                const respone = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/unleash?toggle=${encodeURIComponent(unleashKeys.BRUK_UMAMI)}`);
                if (respone.ok) {
                    const data = await respone.json();
                    settBrukUmami(data[unleashKeys.BRUK_UMAMI]);
                }
            } catch(err) {
                console.error(err);
            }
        }

        fetchToggles();
    }, []);

    return (data: AktivitetData) => {
        const eventData = data || ({} as AktivitetData);
        const trackingFn = brukUmami ? logUmamiEvent : logAmplitudeEvent;
        trackingFn('arbeidssoekerregisteret-for-personbruker.aktivitet', eventData);
    };
}
