import { isEnabled } from '@/lib/unleash-is-enabled';
import unleashKeys from '@/unleash-keys';
import React from 'react';

type UnleashWrapperSSRProps = {
    children: React.ReactNode;
};

const UnleashWrapperSSR: React.FC<UnleashWrapperSSRProps> = async (props) => {
    const { children } = props;
    const styrkeloftIsEnabled = await isEnabled(unleashKeys.EKSPERIMENT_STYRKELOFT);

    if (!styrkeloftIsEnabled) return null;
    return <div>{children}</div>;
};

export { UnleashWrapperSSR };
