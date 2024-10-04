'use client';

import { Heading } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { BekreftelseSkjema } from './bekreftelse-skjema';
import { useEffect, useState } from 'react';
import { BekreftelseBesvart } from './bekreftelse-besvart';
import { Kvittering } from './kvittering';
import { sorterEtterEldsteFoerst } from '@/lib/sorter-etter-eldste-foerst';
import { IkkeAktivArbeidssoker } from './ikke-aktiv-arbeidssoker';
import { loggAktivitet, loggVisning } from '@/lib/amplitude';
import { BekreftelseType, SistInnsendteBekreftelse, TilgjengeligeBekreftelser } from '../../../types/bekreftelse';
import { useRouter } from 'next/router';

export interface BekreftelseProps {
    sprak: Sprak;
    sistInnsendteBekreftelse?: SistInnsendteBekreftelse;
    tilgjengeligeBekreftelser?: TilgjengeligeBekreftelser;
    erAktivArbeidssoker: boolean;
    onSubmit(data: BekreftelseType): Promise<void>;
}

const TEKSTER = {
    nb: {
        heading: 'Bekreft at du fortsatt ønsker å være registrert som arbeidssøker',
    },
};

function Bekreftelse(props: BekreftelseProps) {
    const { sprak, onSubmit, erAktivArbeidssoker } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const [visKvittering, settVisKvittering] = useState<boolean>(false);
    const [sisteBekreftlse, settSisteBekreftlse] = useState<BekreftelseType>();
    const [tilgjengeligeBekreftelser, settTilgjengeligeBekreftelser] = useState<TilgjengeligeBekreftelser>(
        sorterEtterEldsteFoerst(props.tilgjengeligeBekreftelser),
    );

    const router = useRouter();

    const harTilgjengeligeBekreftelser = tilgjengeligeBekreftelser.length > 0;
    const gjeldendeBekreftelse = tilgjengeligeBekreftelser[0];

    const onSubmitSkjema = async (bekreftelse: BekreftelseType) => {
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
        router.push('/');
    };

    useEffect(() => {
        loggVisning({
            viser: 'Bekreftelse',
            antallTilgjengeligeBekreftelser: tilgjengeligeBekreftelser?.length,
            erAktivArbeidssoker: erAktivArbeidssoker,
        });
    }, []);

    if (!erAktivArbeidssoker) {
        return <IkkeAktivArbeidssoker sprak={sprak} />;
    }

    return (
        <div className={'py-4'}>
            <Heading level="1" size="medium" className={'mb-6'}>
                {tekst('heading')}
            </Heading>
            {props.sistInnsendteBekreftelse && !harTilgjengeligeBekreftelser && !visKvittering && (
                <BekreftelseBesvart
                    periode={'21.mars - 6. april'}
                    innsendtDato={'06.03'}
                    nesteDato={'20.04'}
                    besvarelse={props.sistInnsendteBekreftelse}
                    sprak={sprak}
                />
            )}
            {harTilgjengeligeBekreftelser && !visKvittering && (
                <BekreftelseSkjema
                    sprak={sprak}
                    fristDato={'2024-09-01'}
                    bekreftelse={gjeldendeBekreftelse}
                    onSubmit={onSubmitSkjema}
                    onCancel={onCancel}
                />
            )}
            {visKvittering && (
                <Kvittering
                    sprak={sprak}
                    erUtmeldt={!sisteBekreftlse?.vilFortsetteSomArbeidssoeker}
                    harFlereBekreftelser={tilgjengeligeBekreftelser.length > 0}
                    onClick={() => {
                        settVisKvittering(false);
                        loggAktivitet({ aktivitet: 'Trykker på "Bekreft neste periode"' });
                    }}
                />
            )}
        </div>
    );
}

export { Bekreftelse };
