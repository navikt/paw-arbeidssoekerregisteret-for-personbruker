import { useEffect, useState } from 'react';
import LedigeStillingerStateless from '@/components/styrkløft/ledige-stillinger-stateless';

interface Props {
    fetchData(): Promise<{ data?: any; error?: Error }>;
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
    const result = useFetchData(props);

    if (result?.error) {
        // TODO
        return null;
    }

    return <LedigeStillingerStateless {...result?.data} />;
}

export default LedigeStillinger;
