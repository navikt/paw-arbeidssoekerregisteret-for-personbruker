'use client';

import { AktivBrukerProps } from '@/components/styrkløft/aktiv-bruker';
import { useEffect } from 'react';
import { loggVisning } from '@/lib/tracking';
import useOnSubmitTjenestestatus from '@/components/styrkløft/useOnSubmitTjenestestatus';
import AvmeldtStateless from '@/components/styrkløft/avmeldt-stateless';

function Avmeldt(props: AktivBrukerProps) {
    const { brukerprofil, onRefreshServerComponent } = props;
    const optOutTidspunkt = (brukerprofil.flagg || [])
        .filter((f) => f.navn === 'OPT_OUT')
        .sort((a, b) => new Date(b.tidspunkt ?? 0).getTime() - new Date(a.tidspunkt ?? 0).getTime())[0]?.tidspunkt;

    const { onSubmitTjenestestatus, ...submitProps } = useOnSubmitTjenestestatus(props.onSubmitTjenestestatus);

    const onSubmit = async () => {
        try {
            await onSubmitTjenestestatus('AKTIV');
            onRefreshServerComponent();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (!optOutTidspunkt) {
            return;
        }

        loggVisning({ viser: 'Styrkløft avmeldt' });
    }, [optOutTidspunkt]);

    return <AvmeldtStateless {...submitProps} onSubmit={onSubmit} sprak={props.sprak}/>;
}

export default Avmeldt;
