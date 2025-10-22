'use client';

import { useFeatureToggles } from '@/contexts/feature-toggle-context';
import unleashKeys from '@/unleash-keys';
import React from 'react';

type UnleashWrapperProps = {
    children: React.ReactNode;
};

const UnleashWrapper: React.FC<UnleashWrapperProps> = (props) => {
    const { children } = props;
    const allToggles = useFeatureToggles();
    if (!allToggles[unleashKeys.EKSPERIMENT_STYRKELOFT]) return null;
    return <div>{children}</div>;
};

export { UnleashWrapper };
