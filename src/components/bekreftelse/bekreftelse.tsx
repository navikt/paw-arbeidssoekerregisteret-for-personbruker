'use client';

import {
    Bekreftelse as InnsendtBekreftelse,
    Sprak,
    TilgjengeligeBekreftelser
} from '@navikt/arbeidssokerregisteret-utils';
import { BekreftelseSkjema } from './bekreftelse-skjema';
import { useEffect, useState } from 'react';
import { BekreftelseBesvart } from './bekreftelse-besvart';
import { Kvittering } from './kvittering';
import { sorterEtterEldsteFoerst } from '@/lib/sorter-etter-eldste-foerst';
import { IkkeAktivArbeidssoker } from './ikke-aktiv-arbeidssoker';
import { loggAktivitet, loggVisning } from '@/lib/amplitude';
import { useRouter } from 'next/navigation';
import tilSprakAvhengigAppPath from '@/lib/sprak-avhengig-url';
import IngenTilgjengeligeBekreftelser from '@/components/bekreftelse/ingen-tilgjengelige-bekreftelser';
import { BekreftelseSkjemaType } from '@/model/bekreftelse';

export interface BekreftelseProps {
    sprak: Sprak;
    sistInnsendteBekreftelse?: InnsendtBekreftelse;
    tilgjengeligeBekreftelser?: TilgjengeligeBekreftelser;
    erAktivArbeidssoker: boolean;
    onSubmit(data: BekreftelseSkjemaType): Promise<void>;
    registrerArbeidssokerUrl: string;
}

function Bekreftelse(props: BekreftelseProps) {
    const { sprak, onSubmit, erAktivArbeidssoker, registrerArbeidssokerUrl } = props;
    const [visKvittering, settVisKvittering] = useState<boolean>(false);
    const [sisteBekreftlse, settSisteBekreftlse] = useState<BekreftelseSkjemaType>();
    const [tilgjengeligeBekreftelser, settTilgjengeligeBekreftelser] = useState<TilgjengeligeBekreftelser>(
        sorterEtterEldsteFoerst(props.tilgjengeligeBekreftelser),
    );

    const router = useRouter();

    const harTilgjengeligeBekreftelser = tilgjengeligeBekreftelser.length > 0;
    const gjeldendeBekreftelse = tilgjengeligeBekreftelser[0];

    const onSubmitSkjema = async (bekreftelse: BekreftelseSkjemaType) => {
        await onSubmit(bekreftelse);
        settSisteBekreftlse(bekreftelse);
        settVisKvittering(true);
        if (!bekreftelse.vilFortsetteSomArbeidssoeker) {
            settTilgjengeligeBekreftelser([]);
        } else {
            settTilgjengeligeBekreftelser((tilgjengeligeBekreftelser) => tilgjengeligeBekreftelser.slice(1));
        }
        loggAktivitet({
            aktivitet: 'Sender inn bekreftelse',
            vilFortsetteSomArbeidssoeker: bekreftelse.vilFortsetteSomArbeidssoeker,
        });
    };

    const onCancel = () => {
        loggAktivitet({ aktivitet: 'Trykker på "Avbryt" i bekreftelse-skjemaet' });
        router.push(tilSprakAvhengigAppPath('/', sprak));
    };

    useEffect(() => {
        loggVisning({
            viser: 'Bekreftelse',
            antallTilgjengeligeBekreftelser: tilgjengeligeBekreftelser?.length,
            erAktivArbeidssoker: erAktivArbeidssoker,
        });
    }, []);

    if (!erAktivArbeidssoker) {
        return <IkkeAktivArbeidssoker sprak={sprak} registrerArbeidssokerUrl={registrerArbeidssokerUrl} />;
    } else if (visKvittering) {
        return (
            <div className={'px-4'}>
                <Kvittering
                    sprak={sprak}
                    erUtmeldt={!sisteBekreftlse?.vilFortsetteSomArbeidssoeker}
                    harFlereBekreftelser={tilgjengeligeBekreftelser.length > 0}
                    onClick={() => {
                        settVisKvittering(false);
                        loggAktivitet({ aktivitet: 'Trykker på "Bekreft neste periode"' });
                    }}
                />
            </div>
        );
    } else if (harTilgjengeligeBekreftelser) {
        return (
            <div className={'px-4'}>
                <BekreftelseSkjema
                    sprak={sprak}
                    fristDato={'2024-09-01'}
                    bekreftelse={gjeldendeBekreftelse}
                    onSubmit={onSubmitSkjema}
                    onCancel={onCancel}
                />
            </div>
        );
    }

    return (
        <div className={'px-4'}>
            {props.sistInnsendteBekreftelse && (
                <BekreftelseBesvart
                    besvarelse={props.sistInnsendteBekreftelse}
                    sprak={sprak}
                    registrerArbeidssokerUrl={registrerArbeidssokerUrl}
                />
            )}
            {!harTilgjengeligeBekreftelser && <IngenTilgjengeligeBekreftelser sprak={sprak} />}
        </div>
    );
}

export { Bekreftelse };
