'use client';

import LedigeStillingerStateless from '@/components/styrkløft/ledige-stillinger-stateless';

interface Props {
    fetchData(): { data?: any; error?: Error };
}

function LedigeStillinger(props: Props) {
    const { data, error } = props.fetchData();

    if (error || !data) {
        return null;
    }

    return <LedigeStillingerStateless {...data} />;
}

export default LedigeStillinger;
