'use client';

import { Brukerprofil, LedigeStillinger, Tjenestestatus } from '@/model/brukerprofil';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import StyrkLoft from '@/components/styrkløft/styrk-loft';
import byggStillingssoekPayload from '@/lib/bygg-stillingssoek-payload';
import useSWRImmutable from 'swr/immutable';

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

function StyrkEksperiment(props: Props) {
    const onSubmitTjenesteStatus = (status: Tjenestestatus) => {
        return fetcher(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/brukerprofil/tjenestestatus`, {
            tjenestestatus: status,
        });
    };

    const onSubmitStillingsSoek = (val: any) => {
        return fetcher(
            `${process.env.NEXT_PUBLIC_BASE_PATH}/api/brukerprofil/stillingsoek`,
            byggStillingssoekPayload(val),
        );
    };

    const useOnFetchStillinger = () => {
        return useSWRImmutable(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/brukerprofil/ledigestillinger`, swrFetcher);
    };

    return (
        <StyrkLoft
            sprak={props.sprak}
            brukerprofil={props.brukerprofil}
            useOnFetchStillinger={useOnFetchStillinger}
            onSubmitStillingsSoek={onSubmitStillingsSoek}
            onSubmitTjenestestatus={onSubmitTjenesteStatus}
        />
    );
}

export default StyrkEksperiment;
