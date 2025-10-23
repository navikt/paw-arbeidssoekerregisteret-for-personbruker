import { use, useEffect, useState } from 'react';
import LedigeStillingerStateless from '@/components/styrkløft/ledige-stillinger-stateless';

interface Props {
    fetchData(): Promise<{ data?: any; error?: Error }>;
    isStorybook?: boolean;
}
/*
 Hook for å simulere data-fetching på klient i storybook.
 I next-app fetches data server-side
* */
function useFetchDataClientMock(props: Props) {
    const [result, settResult] = useState<{ data?: any; error?: Error }>();
    useEffect(() => {
        async function init() {
            settResult(await props.fetchData());
        }
        if (props.isStorybook) {
            init();
        }
    }, [props]);

    return result;
}

function LedigeStillinger(props: Props) {
    let result = useFetchDataClientMock(props);

    if (!props.isStorybook) {
        result = use(props.fetchData());
    }

    if (result?.error) {
        // TODO
        return null;
    }

    return <LedigeStillingerStateless {...result?.data} />;
}

export default LedigeStillinger;
