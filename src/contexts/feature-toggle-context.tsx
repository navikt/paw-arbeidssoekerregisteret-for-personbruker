'use client';

import unleashKeys from '@/unleash-keys';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface FeatureTogglesContextState {
    [unleashKeys.BRUK_UMAMI]: boolean;
}

const FeatureTogglesContext = createContext<FeatureTogglesContextState>({} as any);
function FeatureTogglesProvider({ children }: { children: ReactNode }) {
    const [toggles, settToggles] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        async function fetchToggles() {
            try {
                const searchParams = Object.values(unleashKeys).map(k => `toggle=${k}`).join('&');
                const respone = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/unleash?${searchParams}`,
                );
                if (respone.ok) {
                    const data = await respone.json();
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
