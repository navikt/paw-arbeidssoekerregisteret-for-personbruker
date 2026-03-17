import LedigeStillingerStateless from '@/components/styrkløft/ledige-stillinger-stateless';
import { useRef, useState } from 'react';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { loggStyrkeloft } from '@/lib/tracking';
import { LedigeStillinger as LedigeStillingerSoek } from '@/model/brukerprofil';
interface Props {
    useOnFetchData(): { data?: LedigeStillingerSoek; error?: Error };
    sprak: Sprak;
    kanSeDirektemeldteStillinger: boolean;
}
export type AktivFane = 'ledigeStillinger' | 'direktemeldteStillinger';
function LedigeStillinger(props: Props) {
    const { data } = props.useOnFetchData();
    const [aktivSide, settAktivSide] = useState<number>(1);
    const [aktivFane, settAktivFane] = useState<AktivFane>('direktemeldteStillinger');

    const ref = useRef<HTMLDivElement>(null);

    const onClick = (side: number) => {
        const skalScrolle = side !== aktivSide;
        settAktivSide(side);
        loggStyrkeloft({ aktivitet: 'Trykker på pagineringsknapp' });

        if (skalScrolle && ref.current) {
            ref.current.scrollIntoView(true);
        }
    };

    const visDirektemeldteStillinger = props.kanSeDirektemeldteStillinger && aktivFane === 'direktemeldteStillinger';
    const resultat = (data?.resultat ?? []).filter((stilling) => {
        const erDirektemeldtStilling = (stilling.tags || []).includes('DIREKTEMELDT_V1');
        return visDirektemeldteStillinger === erDirektemeldtStilling;
    });
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
            kanSeDirektemeldteStillinger={props.kanSeDirektemeldteStillinger}
            aktivFane={aktivFane}
            onAktivFaneChange={settAktivFane}
        />
    );
}

export default LedigeStillinger;
