import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { useState } from 'react';
import VelgStillingssoekStateless from '@/components/styrkløft/velg-stillingssoek-stateless';

interface Props {
    onSubmit(data: any): Promise<void>;
    fylker?: string[];
    yrkeskategorier?: string[];
    sprak: Sprak;
}

function VelgStillingssoek(props: Props) {
    const { sprak } = props;
    const [valgteFylker, settValgteFylker] = useState<string[]>(props.fylker ?? []);
    const [valgteYrkeskategorier, settValgteYrkeskategorier] = useState<string[]>(props.yrkeskategorier ?? []);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async () => {
        try {
            setIsPending(true);
            await props.onSubmit({
                fylker: valgteFylker,
                yrkeskategorier: valgteYrkeskategorier,
            });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <VelgStillingssoekStateless
            onSubmit={onSubmit}
            fylker={valgteFylker}
            yrkeskategorier={valgteYrkeskategorier}
            sprak={sprak}
            onChangeYrkeskategorier={(val) => settValgteYrkeskategorier(val)}
            onChangeFylker={(val) => settValgteFylker(val)}
            pending={isPending}
            error={error}
        />
    );
}

export default VelgStillingssoek;
