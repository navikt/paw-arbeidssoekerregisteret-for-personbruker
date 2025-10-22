import { isEnabled } from '@/lib/unleash-is-enabled';
import unleashKeys from '@/unleash-keys';
import React from 'react';

type UnleashWrapperSSRProps = {
    children: React.ReactNode;
};

const UnleashWrapperSSR: React.FC<UnleashWrapperSSRProps> = (props) => {
    const { children } = props;

    if (!isEnabled(unleashKeys.EKSPERIMENT_STYRKELOFT)) return null;
    return <div>{children}</div>;
};

export { UnleashWrapperSSR };
