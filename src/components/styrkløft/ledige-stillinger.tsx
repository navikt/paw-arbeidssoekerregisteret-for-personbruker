import LedigeStillingerStatic from '@/components/styrkløft/ledige-stillinger-static';

interface Props {
    fetchData(): Promise<{ data?: any; error?: Error }>;
}

async function LedigeStillinger(props: Props) {
    const { data, error } = await props.fetchData();

    if (error) {
        // TODO
        return null;
    }

    return <LedigeStillingerStatic resultat={data} />;
}

export default LedigeStillinger;
