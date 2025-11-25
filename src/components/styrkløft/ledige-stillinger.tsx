import LedigeStillingerStateless from '@/components/styrkløft/ledige-stillinger-stateless';
import { useRef, useState } from 'react';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { loggStyrkeloft } from '@/lib/tracking';

interface Props {
    useOnFetchData(): { data?: any; error?: Error };
    sprak: Sprak;
}

function LedigeStillinger(props: Props) {
    const { data } = props.useOnFetchData();
    const [aktivSide, settAktivSide] = useState<number>(1);
    const ref = useRef<HTMLDivElement>(null);

    const onClick = (side: number) => {
        const skalScrolle = side !== aktivSide;
        settAktivSide(side);
        loggStyrkeloft({ aktivitet: 'Trykker på pagineringsknapp' });

        if (skalScrolle && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const resultat = data?.resultat ?? [];
    const brukPaginering = resultat.length > 7;
    const aktivtResultat = aktivSide === 1 ? Array.from(resultat).splice(0, 7) : Array.from(resultat).splice(7);

    return (
        <LedigeStillingerStateless
            ref={ref}
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
