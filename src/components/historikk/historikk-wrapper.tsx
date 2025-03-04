import { prettyPrintDato, prettyPrintDatoOgKlokkeslett } from '@/lib/date-utils';
import {
    lagHentTekstForSprak,
    Sprak,
} from '@navikt/arbeidssokerregisteret-utils';
import { AggregertPeriode } from '../../../types/aggregerte-perioder';
import { Heading, BodyShort } from '@navikt/ds-react';

import { BekreftelseHistorikk } from './bekreftelse-historikk';
import { OpplysningerHistorikk } from '@/components/historikk/opplysninger-historikk';

export interface Historikk extends AggregertPeriode {
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        startet: 'Startet',
        avsluttet: 'Avsluttet',
        sluttarsak: 'Sluttårsak',
        periode: 'Periode',
        av: 'av',
        SLUTTBRUKER: 'deg',
        SYSTEM: 'Nav',
        VEILEDER: 'veileder',
        'fortsatt aktiv': 'fortsatt aktiv',
        'graceperiode utløpt': 'Ikke bekreftet arbeidssøkerstatus',
        'stopp av periode': 'Stoppet av veileder',
        'svarte nei på spørsmål \'vil du fortsatt være registrert som arbeidssøker?\'': 'Stoppet av bruker'
    },
    nn: {
        startet: 'Starta',
        avsluttet: 'Avslutta',
        sluttarsak: 'Sluttårsak',
        periode: 'Periode',
        av: 'av',
        SLUTTBRUKER: 'deg',
        SYSTEM: 'Nav',
        VEILEDER: 'rettleiar',
        'fortsatt aktiv': 'framleis aktiv',
        'graceperiode utløpt': 'Ikkje stadfesta arbeidssøkjarstatus',
        'stopp av periode': 'Stoppet av rettleiar',
        'svarte nei på spørsmål \'vil du fortsatt være registrert som arbeidssøker?\'': 'Stoppet av bruker'
    },
    en: {
        startet: 'Started',
        avsluttet: 'Stopped',
        sluttarsak: 'Reason',
        periode: 'Period',
        av: 'by',
        SLUTTBRUKER: 'you',
        SYSTEM: 'Nav',
        VEILEDER: 'supervisor',
        'fortsatt aktiv': 'still active',
        'graceperiode utløpt': 'Job seeker status not confirmed',
        'stopp av periode': 'Stopped by supervisor',
        'svarte nei på spørsmål \'vil du fortsatt være registrert som arbeidssøker?\'': 'Stopped by user'
    },
};

export function HistorikkWrapper(props: Historikk) {
    const { startet, avsluttet, bekreftelser, opplysningerOmArbeidssoeker, sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const startTidspunkt = startet.tidspunktFraKilde?.tidspunkt ?? startet.tidspunkt;
    return (
        <>
            <Heading level="2" size="large">
                {prettyPrintDato(startTidspunkt, sprak)} -{' '}
                {avsluttet && avsluttet.tidspunkt ? prettyPrintDato(avsluttet.tidspunkt, sprak) : tekst('fortsatt aktiv')}
            </Heading>
            <Heading level='3' size='small' className='mt-4'>
                {tekst('periode')}
            </Heading>
            <div className='grid grid-cols-3 gap-x-2'>
                <div className='font-semibold'>{tekst('startet')}</div>
                <div>{prettyPrintDatoOgKlokkeslett(startet.tidspunkt, sprak)}</div>
                <div>{tekst('av')} {tekst(startet.utfoertAv.type)}</div>
                <div className='font-semibold'>{tekst('avsluttet')}</div>
                {avsluttet && avsluttet.tidspunkt
                    ? <><div>{prettyPrintDatoOgKlokkeslett(avsluttet.tidspunkt, sprak)}</div><div>{tekst('av')} {tekst(avsluttet.utfoertAv.type)}</div></>
                    : <><div className='col-span-2'>{tekst('fortsatt aktiv')}</div></>}
            </div>
            <Heading level='3' size='small' className='mt-4'>
                {tekst('sluttarsak')}
            </Heading>
            <BodyShort>{tekst(avsluttet?.aarsak.toLocaleLowerCase() ?? 'fortsatt aktiv')}</BodyShort>
            <BekreftelseHistorikk bekreftelser={bekreftelser} sprak={sprak}/>
            <OpplysningerHistorikk
                opplysningerOmArbeidssoker={opplysningerOmArbeidssoeker}
                sprak={sprak}
                className={'mt-4'}
            />
        </>
    );
}
