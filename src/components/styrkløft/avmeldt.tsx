'use client';

import type { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { useEffect } from 'react';
import AvmeldtStateless from '@/components/styrkløft/avmeldt-stateless';
import useOnSubmitTjenestestatus from '@/components/styrkløft/useOnSubmitTjenestestatus';
import { loggStyrkeloft, loggVisning } from '@/lib/tracking';
import type { Brukerprofil } from '@/model/brukerprofil';

interface AvmeldtProps {
    brukerprofil: Brukerprofil;
    onSubmitTjenestestatus(status: string): Promise<void>;
    sprak: Sprak;
}

function Avmeldt(props: AvmeldtProps) {
    const { brukerprofil } = props;
    const optOutTidspunkt = (brukerprofil.flagg || [])
        .filter((f) => f.navn === 'OPT_OUT')
        .sort((a, b) => new Date(b.tidspunkt ?? 0).getTime() - new Date(a.tidspunkt ?? 0).getTime())[0]?.tidspunkt;

    const { onSubmitTjenestestatus, ...submitProps } = useOnSubmitTjenestestatus(props.onSubmitTjenestestatus);

    const onSubmit = () => {
        loggStyrkeloft({ aktivitet: 'Trykker på Vis ledige stillinger fra avmeldt' });
        return onSubmitTjenestestatus('AKTIV');
    };

    useEffect(() => {
        if (!optOutTidspunkt) {
            return;
        }

        loggVisning({ viser: 'Styrkløft avmeldt' });
    }, [optOutTidspunkt]);

    return <AvmeldtStateless {...submitProps} onSubmit={onSubmit} sprak={props.sprak} />;
}

export default Avmeldt;
