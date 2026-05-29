import type { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { useState } from 'react';
import VelgStillingssoekStateless from '@/components/styrkløft/velg-stillingssoek-stateless';
import type { StillingsSoekPayload } from '@/model/stillings-soek';

interface Props {
    onSubmit(data: StillingsSoekPayload): Promise<void>;
    onCancel?: () => void;
    fylker?: string[];
    yrkeskategorier?: string[];
    visStillingerUtenKrav?: boolean;
    sprak: Sprak;
}

function VelgStillingssoek(props: Props) {
    const { sprak, onCancel } = props;
    const [valgteFylker, settValgteFylker] = useState<string[]>(props.fylker ?? []);
    const [valgteYrkeskategorier, settValgteYrkeskategorier] = useState<string[]>(props.yrkeskategorier ?? []);
    const [visStillingerUtenKrav, settVisStillingerUtenKrav] = useState<boolean>(props.visStillingerUtenKrav ?? false);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async () => {
        try {
            setIsPending(true);
            await props.onSubmit({
                fylker: valgteFylker,
                yrkeskategorier: valgteYrkeskategorier,
                visStillingerUtenKrav,
            });
        } catch (err: any) {
            setError(err);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <VelgStillingssoekStateless
            onSubmit={onSubmit}
            onCancel={onCancel}
            fylker={valgteFylker}
            yrkeskategorier={valgteYrkeskategorier}
            visStillingerUtenKrav={visStillingerUtenKrav}
            sprak={sprak}
            onChangeYrkeskategorier={(val) => settValgteYrkeskategorier(val)}
            onChangeFylker={(val) => settValgteFylker(val)}
            onChangeVisStillingerUtenKrav={settVisStillingerUtenKrav}
            pending={isPending}
            error={error}
        />
    );
}

export default VelgStillingssoek;
