import LedigeStillingerStateless from '@/components/styrkløft/ledige-stillinger-stateless';

interface Props {
    useOnFetchData(): { data?: any; error?: Error };
}

function LedigeStillinger(props: Props) {
    const { data } = props.useOnFetchData();
    return <LedigeStillingerStateless {...data} />;
}

export default LedigeStillinger;
