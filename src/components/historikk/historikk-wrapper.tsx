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
        SLUTTBRUKER: 'bruker',
        SYSTEM: 'Nav',
        VEILEDER: 'veileder',
        'fortsatt aktiv': 'fortsatt aktiv',
        'graceperiode utløpt': 'Ikke bekreftet arbeidssøkerstatus',
        'stopp av periode': 'Stoppet av veileder',
    },
};

export function HistorikkWrapper(props: Historikk) {
    const { startet, avsluttet, bekreftelser, opplysningerOmArbeidssoeker, sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return (
        <>
            <Heading level="2" size="large">
                {prettyPrintDato(startet.tidspunkt, sprak)} -{' '}
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
