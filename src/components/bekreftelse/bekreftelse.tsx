'use client';

import type { Sprak, TilgjengeligeBekreftelser } from '@navikt/arbeidssokerregisteret-utils';
import type { BekreftelseHendelse } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import IngenTilgjengeligeBekreftelser from '@/components/bekreftelse/ingen-tilgjengelige-bekreftelser';
import { sorterEtterEldsteFoerst } from '@/lib/sorter-etter-eldste-foerst';
import { tilSprakAvhengigAppPath } from '@/lib/sprak-avhengig-url';
import { loggAktivitet } from '@/lib/tracking';
import type { BekreftelseSkjemaType } from '@/model/bekreftelse';
import type { Brukerprofil } from '@/model/brukerprofil';
import { BekreftelseBesvart } from './bekreftelse-besvart';
import { BekreftelseSkjema } from './bekreftelse-skjema';
import { IkkeAktivArbeidssoker } from './ikke-aktiv-arbeidssoker';
import { Kvittering } from './kvittering';

export interface BekreftelseProps {
    sprak: Sprak;
    sistInnsendteBekreftelse?: BekreftelseHendelse;
    tilgjengeligeBekreftelser?: TilgjengeligeBekreftelser;
    erAktivArbeidssoker: boolean;
    registrerArbeidssokerUrl: string;
    brukerprofil?: Brukerprofil;

    onSubmit(data: BekreftelseSkjemaType): Promise<void>;
}

function Bekreftelse(props: BekreftelseProps) {
    const { sprak, onSubmit, erAktivArbeidssoker, registrerArbeidssokerUrl, brukerprofil } = props;
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
                    brukerprofil={brukerprofil}
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
