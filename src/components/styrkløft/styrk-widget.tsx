'use client';

import type { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { useReducer } from 'react';
import useSWRImmutable from 'swr/immutable';
import { initialStyrkState, reducer } from '@/components/styrkløft/reducer';
import StyrkLoft from '@/components/styrkløft/styrk-loft';
import byggStillingssoekPayload from '@/lib/bygg-stillingssoek-payload';
import type { Brukerprofil, LedigeStillinger, Tjenestestatus } from '@/model/brukerprofil';
import type { StillingsSoekPayload } from '@/model/stillings-soek';

interface Props {
    sprak: Sprak;
    brukerprofil: Brukerprofil;
    ledigeStillinger?: LedigeStillinger;
}

function fetcher(path: string, body: any) {
    return fetch(path, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return;
    });
}

const swrFetcher = (url: string) => {
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
};

function StyrkWidget(props: Props) {
    const onSubmitTjenesteStatus = (status: Tjenestestatus) => {
        return fetcher(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/brukerprofil/tjenestestatus`, {
            tjenestestatus: status,
        });
    };

    const onSubmitStillingsSoek = (val: StillingsSoekPayload) => {
        return fetcher(
            `${process.env.NEXT_PUBLIC_BASE_PATH}/api/brukerprofil/stillingsoek`,
            byggStillingssoekPayload(val),
        );
    };

    const useOnFetchStillinger = () => {
        return useSWRImmutable(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/brukerprofil/ledigestillinger`, swrFetcher, {
            suspense: true,
            // Når server-rendret data finnes, unngå revalidering ved mount slik at lista ikke
            // endrer høyde etter hydrering (CLS). Uten fallbackData beholdes opprinnelig henting.
            revalidateOnMount: props.ledigeStillinger === undefined,
            fallbackData: props.ledigeStillinger,
        });
    };

    const [state, dispatch] = useReducer(reducer, props.brukerprofil, initialStyrkState);

    return (
        <StyrkLoft
            sprak={props.sprak}
            useOnFetchStillinger={useOnFetchStillinger}
            onSubmitStillingsSoek={onSubmitStillingsSoek}
            onSubmitTjenestestatus={onSubmitTjenesteStatus}
            state={state}
            dispatch={dispatch}
        />
    );
}

export default StyrkWidget;
