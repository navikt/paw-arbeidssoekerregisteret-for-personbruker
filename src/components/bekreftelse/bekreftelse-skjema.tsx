'use client';

import { lagHentTekstForSprak, Sprak, TilgjengeligBekreftelse } from '@navikt/arbeidssokerregisteret-utils';
import { Button, Heading, Radio, RadioGroup } from '@navikt/ds-react';
import InfoTekst from './info-tekst';
import { useEffect, useState } from 'react';
import { BekreftAvsluttPeriode } from '@/components/bekreftelse/bekreft-avslutt-periode';
import { prettyPrintDato } from '@/lib/date-utils';
import { loggAktivitet } from '@/lib/amplitude';
import Feilmelding from '@/components/bekreftelse/feilmelding';
import { BekreftelseSkjemaType } from '@/model/bekreftelse';

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
        heading: 'Bekreft at du vil være registrert som arbeidssøker',
        beenWorking: 'Har du vært i arbeid i perioden ',
        yes: 'Ja',
        no: 'Nei',
        wantToBeRegistered: 'Vil du fortsatt være registrert som arbeidssøker?',
        submit: 'Send inn',
        cancel: 'Avbryt',
        validationError: 'Du må svare før du kan sende inn',
    },
    nn: {
        heading: 'Stadfest at du ønskjer å vere registrert som arbeidssøkjar',
        beenWorking: 'Har du vore i arbeid i perioden ',
        yes: 'Ja',
        no: 'Nei',
        wantToBeRegistered: 'Ønskjer du å framleis vere registrert som arbeidssøkjar?',
        submit: 'Send inn',
        cancel: 'Avbryt',
    },
    en: {
        heading: 'Confirm that you want to stay registered as a jobseekerr',
        beenWorking: 'Have you worked in the period ',
        yes: 'Yes',
        no: 'No',
        wantToBeRegistered: 'Do you wish to remain registered as a jobseeker?',
        submit: 'Submit',
        cancel: 'Cancel',
        validationError: 'You must answer before submitting',
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
    const [visFeilmeldingISkjema, settVisFeilmeldingISkjema] = useState<boolean>(false);

    useEffect(() => {
        settHarGyldigSkjema(
            Object.values(skjemaState).filter((v) => typeof v !== 'undefined').length ===
                Object.keys(skjemaState).length,
        );
    }, [skjemaState]);

    const onSubmit = async () => {
        if (!harGyldigSkjema) {
            settVisFeilmeldingISkjema(true);
            return;
        }

        settError(null);
        settVisFeilmeldingISkjema(false);

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
                onSubmit={() =>
                    props.onSubmit({
                        ...skjemaState,
                        bekreftelseId: bekreftelse.bekreftelseId,
                    } as BekreftelseSkjemaType)
                }
                onCancel={() => {
                    settVisBekreftAvsluttPeriode(false);
                    loggAktivitet({ aktivitet: 'Avbryter avslutning av periode' });
                }}
                sprak={sprak}
            />
        );
    }

    const periode = `${prettyPrintDato(gjelderFra)} - ${prettyPrintDato(gjelderTil)}`;

    return (
        <>
            <Heading level={'1'} size={'xlarge'} className={'mb-6'}>
                {tekst('heading')}
            </Heading>
            <InfoTekst sprak={sprak} />
            <RadioGroup
                autoFocus={true}
                legend={`${tekst('beenWorking')} ${periode}?`}
                value={getRadioGroupValue(skjemaState.harJobbetIDennePerioden)}
                onChange={(e) => settSkjemaState((state) => ({ ...state, harJobbetIDennePerioden: e === 'ja' }))}
                className={'mb-4'}
                error={
                    visFeilmeldingISkjema &&
                    skjemaState.harJobbetIDennePerioden === undefined &&
                    tekst('validationError')
                }
            >
                <Radio value="ja" checked={skjemaState.harJobbetIDennePerioden === true} autoFocus={true}>
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
                error={
                    visFeilmeldingISkjema &&
                    skjemaState.vilFortsetteSomArbeidssoeker === undefined &&
                    tekst('validationError')
                }
            >
                <Radio value="ja">{tekst('yes')}</Radio>
                <Radio value="nei">{tekst('no')}</Radio>
            </RadioGroup>
            <Button variant="primary" disabled={senderSkjema} onClick={onSubmit} loading={senderSkjema}>
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
