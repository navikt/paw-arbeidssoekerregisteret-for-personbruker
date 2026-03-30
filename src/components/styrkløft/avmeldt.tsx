'use client';

import { AktivBrukerProps } from '@/components/styrkløft/aktiv-bruker';
import { useEffect } from 'react';
import { loggVisning } from '@/lib/tracking';

function Avmeldt(props: AktivBrukerProps) {
    const { brukerprofil } = props;
    const optOutTidspunkt = (brukerprofil.flagg || [])
        .filter((f) => f.navn === 'OPT_OUT')
        .sort((a, b) => new Date(b.tidspunkt ?? 0).getTime() - new Date(a.tidspunkt ?? 0).getTime())[0]?.tidspunkt;

    useEffect(() => {
        if (!optOutTidspunkt) {
            return;
        }

        loggVisning({ viser: 'Styrkløft avmeldt' });
    }, [optOutTidspunkt]);

    return null;
}

// function AvmeldtKomponent(props: AktivBrukerProps) {
//     return (
//         <Box background="default" padding="space-24" borderRadius="12" borderColor="neutral-subtle" borderWidth="1">
//             <InlineMessage status={'info'}>
//                 Du har sagt at du ikke vil se ledige stillinger. Ønsker du å ombestemme deg? Gå til{' '}
//                 <a href="#">innstillinger</a> for å endre dette.
//             </InlineMessage>
//         </Box>
//     );
// }

export default Avmeldt;
