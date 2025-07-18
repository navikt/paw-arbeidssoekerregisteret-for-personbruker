'use client';

import { useEffect } from 'react';
import { initAmplitude } from '@/lib/tracking/amplitude';

interface Props {
    apiKey: string;
}

const InitAmplitude = ({ apiKey }: Props) => {
    useEffect(() => {
        initAmplitude(apiKey);
    }, [apiKey]);

    return null;
}

export default InitAmplitude;
