'use client';

import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Button, Radio, RadioGroup } from '@navikt/ds-react';
import InfoTekst from './info-tekst';
import { useEffect, useState } from 'react';
import { BekreftelseSkjemaType, TilgjengeligBekreftelse } from '../../../types/bekreftelse';
import { BekreftAvsluttPeriode } from '@/components/bekreftelse/bekreft-avslutt-periode';
import {prettyPringDato} from '@/lib/date-utils';
import { loggAktivitet } from '@/lib/amplitude';
import Feilmelding from '@/components/bekreftelse/feilmelding';

interface Skjema {
    harJobbetIDennePerioden?: boolean;
    vilFortsetteSomArbeidssoeker?: boolean;
}

export interface Props {
    visIkkeSvartAdvarsel?: 'warning' | 'error';
    sprak: Sprak;
    fristDato: string;
    bekreftelse: TilgjengeligBekreftelse;
    onSubmit(data: BekreftelseSkjemaType): Promise<void>;
    onCancel(): void;
}

const TEKSTER = {
    nb: {
        beenWorking: 'Har du vært i arbeid i perioden ',
        yes: 'Ja',
        no: 'Nei',
        wantToBeRegistered: 'Vil du fortsatt være registrert som arbeidssøker?',
        submit: 'Send inn',
        cancel: 'Avbryt',
        noReply: 'Du har ikke svart',
        alertText1: 'Hvis du ikke svarer i løpet av ',
        alertText2: ', vil du ikke lenger være registrert som arbeidssøker fra ',
    },
};

const getRadioGroupValue = (skjemaVerdi: boolean | undefined) => {
    if (typeof skjemaVerdi === 'undefined') {
        return;
    }

    return skjemaVerdi ? 'ja' : 'nei';
};

const BekreftelseSkjema = (props: Props) => {
    const { sprak, bekreftelse, onCancel } = props;
    const { gjelderFra, gjelderTil } = bekreftelse;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const [skjemaState, settSkjemaState] = useState<Skjema>({
        harJobbetIDennePerioden: undefined,
        vilFortsetteSomArbeidssoeker: undefined,
    });

    const [harGyldigSkjema, settHarGyldigSkjema] = useState<boolean>(false);
    const [visBekreftAvsluttPeriode, settVisBekreftAvsluttPeriode] = useState<boolean>(false);
    const [senderSkjema, settSenderSkjema] = useState<boolean>(false);
    const [error, settError] = useState<any>(null);

    useEffect(() => {
        settHarGyldigSkjema(
            Object.values(skjemaState).filter((v) => typeof v !== 'undefined').length ===
                Object.keys(skjemaState).length,
        );
    }, [skjemaState]);

    const onSubmit = async () => {
        settError(null);

        if (!skjemaState.vilFortsetteSomArbeidssoeker) {
            settVisBekreftAvsluttPeriode(true);
            return;
        }

        settSenderSkjema(true);
        try {
            await props.onSubmit({ ...skjemaState, bekreftelseId: bekreftelse.bekreftelseId } as BekreftelseSkjemaType);
        } catch (err) {
            settError(err);
        } finally {
            settSenderSkjema(false);
        }
    };

    if (visBekreftAvsluttPeriode) {
        return (
            <BekreftAvsluttPeriode
                onSubmit={() => props.onSubmit({ ...skjemaState, bekreftelseId: bekreftelse.bekreftelseId } as BekreftelseSkjemaType)}
                onCancel={() => {
                    settVisBekreftAvsluttPeriode(false);
                    loggAktivitet({ aktivitet: 'Avbryter avslutning av periode' });
                }}
                sprak={sprak}
            />
        );
    }

    const periode = `${prettyPringDato(gjelderFra)} - ${prettyPringDato(gjelderTil)}`;

    return (
        <>
            <InfoTekst sprak={sprak} />
            <RadioGroup
                legend={`${tekst('beenWorking')} ${periode}?`}
                value={getRadioGroupValue(skjemaState.harJobbetIDennePerioden)}
                onChange={(e) => settSkjemaState((state) => ({ ...state, harJobbetIDennePerioden: e === 'ja' }))}
                className={'mb-4'}
            >
                <Radio value="ja" checked={skjemaState.harJobbetIDennePerioden === true}>
                    {tekst('yes')}
                </Radio>
                <Radio value="nei" checked={skjemaState.harJobbetIDennePerioden === false}>
                    {tekst('no')}
                </Radio>
            </RadioGroup>
            <RadioGroup
                legend={`${tekst('wantToBeRegistered')}`}
                value={getRadioGroupValue(skjemaState.vilFortsetteSomArbeidssoeker)}
                onChange={(e) => settSkjemaState((state) => ({ ...state, vilFortsetteSomArbeidssoeker: e === 'ja' }))}
                className={'mb-4'}
            >
                <Radio value="ja">{tekst('yes')}</Radio>
                <Radio value="nei">{tekst('no')}</Radio>
            </RadioGroup>
            <Button variant="primary" disabled={!harGyldigSkjema} onClick={onSubmit} loading={senderSkjema}>
                {tekst('submit')}
            </Button>
            <Button className={'ml-4'} variant={'tertiary'} onClick={onCancel} disabled={senderSkjema}>
                {tekst('cancel')}
            </Button>
            {error && <Feilmelding />}
        </>
    );
};

export { BekreftelseSkjema };
