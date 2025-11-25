import LedigeStillingerStateless from '@/components/styrkløft/ledige-stillinger-stateless';
import { useState } from 'react';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { loggStyrkeloft } from '@/lib/tracking';

interface Props {
    useOnFetchData(): { data?: any; error?: Error };
    sprak: Sprak;
}

function LedigeStillinger(props: Props) {
    const { data } = props.useOnFetchData();
    const [aktivSide, settAktivSide] = useState<number>(1);
    const onClick = (side: number) => {
        settAktivSide(side);
        loggStyrkeloft({ aktivitet: 'Trykker på pagineringsknapp' });
    };
    const resultat = data?.resultat ?? [];
    const brukPaginering = resultat.length > 7;
    const aktivtResultat = aktivSide === 1 ? resultat.splice(0, 7) : resultat.splice(7);

    return (
        <LedigeStillingerStateless
            resultat={aktivtResultat}
            onClick={onClick}
            soek={data?.soek}
            sprak={props.sprak}
            antallSider={2}
            aktivSide={aktivSide}
            brukPaginering={brukPaginering}
        />
    );
}

export default LedigeStillinger;
