import { prettyPrintDato, prettyPrintDatoOgKlokkeslett } from '@/lib/date-utils';
import {
    ArbeidssokerPeriode,
    Bekreftelse,
    lagHentTekstForSprak,
    OpplysningerOmArbeidssoker,
    Profilering,
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
                {prettyPrintDato(startet.tidspunkt)} -{' '}
                {avsluttet && avsluttet.tidspunkt ? prettyPrintDato(avsluttet.tidspunkt) : tekst('fortsatt aktiv')}
            </Heading>
            <BodyShort>
                {tekst('startet')}: {prettyPrintDatoOgKlokkeslett(startet.tidspunkt)} {tekst('av')} {tekst(startet.utfoertAv.type)}
            </BodyShort>
            <BodyShort>
                {tekst('avsluttet')}:{' '}
                {avsluttet && avsluttet.tidspunkt
                    ? <>{prettyPrintDatoOgKlokkeslett(avsluttet.tidspunkt)} {tekst('av')} {tekst(avsluttet.utfoertAv.type)}</>
                    : tekst('fortsatt aktiv')}
            </BodyShort>
            <BodyShort>{tekst('sluttarsak')}: {tekst(avsluttet?.aarsak.toLocaleLowerCase() ?? 'fortsatt aktiv')}</BodyShort>
            <BekreftelseHistorikk bekreftelser={bekreftelser} />
            <OpplysningerHistorikk
                opplysningerOmArbeidssoker={opplysningerOmArbeidssoeker}
                sprak={sprak}
                className={'mt-4'}
            />
        </>
    );
}
