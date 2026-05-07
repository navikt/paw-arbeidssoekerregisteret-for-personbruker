'use client';

import unleashKeys from '@/unleash-keys';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface FeatureTogglesContextState {
    [unleashKeys.BRUK_UXSIGNALS]: boolean;
}

const FeatureTogglesContext = createContext<FeatureTogglesContextState>({} as any);

function FeatureTogglesProvider({
    children,
    initialToggles = {},
}: {
    children: ReactNode;
    initialToggles?: { [key: string]: boolean };
}) {
    const [toggles, settToggles] = useState<{ [key: string]: boolean }>(initialToggles);

    useEffect(() => {
        async function fetchToggles() {
            try {
                const toggleKeys = Object.values(unleashKeys);
                if (toggleKeys.length === 0) return;

                const searchParams = toggleKeys.map((k) => `toggle=${k}`).join('&');
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/unleash?${searchParams}`);
                if (response.ok) {
                    const data = await response.json();
                    settToggles(data);
                }
            } catch (err) {
                console.error(err);
            }
        }

        fetchToggles();
    }, []);

    return <FeatureTogglesContext.Provider value={toggles}>{children}</FeatureTogglesContext.Provider>;
}

function useFeatureToggles() {
    const context = useContext(FeatureTogglesContext);
    if (context === undefined) {
        throw new Error('useConfig må brukes under en ConfigProvider');
    }

    return context;
}

export { FeatureTogglesProvider, useFeatureToggles };
