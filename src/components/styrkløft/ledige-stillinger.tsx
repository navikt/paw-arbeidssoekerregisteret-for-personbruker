'use client';

import { useEffect, useState } from 'react';
import LedigeStillingerStateless from '@/components/styrkløft/ledige-stillinger-stateless';
import useSWR from 'swr';

interface Props {
    fetchData(): { data?: any; error?: Error };
}

function useFetchData(props: Props) {
    const [result, settResult] = useState<{ data?: any; error?: Error }>();
    useEffect(() => {
        async function init() {
            settResult(await props.fetchData());
        }
        init();
    }, [props]);

    return result;
}

function LedigeStillinger(props: Props) {
    const { data, error } = props.fetchData();

    if (error || !data) {
        return null;
    }

    return <LedigeStillingerStateless {...data} />;
}

export default LedigeStillinger;
