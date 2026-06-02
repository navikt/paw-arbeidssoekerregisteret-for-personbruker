import type { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { useReducer, useState } from 'react';
import {
    initialVelgStillingssoekState,
    type VelgStillingssoekState,
    velgStillingssoekReducer,
} from '@/components/styrkløft/velg-stillingssoek-reducer';
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

function validate(state: VelgStillingssoekState): boolean {
    return state.visStillingerUtenKrav || (state.fylker.verdi.length > 0 && state.yrkeskategorier.verdi.length > 0);
}

function VelgStillingssoek(props: Props) {
    const { sprak, onCancel } = props;
    const [skjemaState, dispatch] = useReducer(
        velgStillingssoekReducer,
        {
            fylker: props.fylker ?? [],
            yrkeskategorier: props.yrkeskategorier ?? [],
            visStillingerUtenKrav: props.visStillingerUtenKrav ?? false,
        },
        initialVelgStillingssoekState,
    );

    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async () => {
        try {
            dispatch({ type: 'SETT_HAR_SENDT_INN_SKJEMA', payload: true });
            if (validate(skjemaState)) {
                setIsPending(true);
                await props.onSubmit({
                    fylker: skjemaState.fylker.verdi,
                    yrkeskategorier: skjemaState.yrkeskategorier.verdi,
                    visStillingerUtenKrav: skjemaState.visStillingerUtenKrav,
                });
            }
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
            skjemaState={skjemaState}
            sprak={sprak}
            onChangeYrkeskategorier={(val) => dispatch({ type: 'SETT_YRKESKATEGORIER', payload: val })}
            onChangeFylker={(val) => dispatch({ type: 'SETT_FYLKER', payload: val })}
            onChangeVisStillingerUtenKrav={(val) => dispatch({ type: 'SETT_VIS_STILLINGER_UTEN_KRAV', payload: val })}
            pending={isPending}
            error={error}
        />
    );
}

export default VelgStillingssoek;
