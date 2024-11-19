import { prettyPrintDato } from "@/lib/date-utils";
import {
    ArbeidssokerPeriode,
    Bekreftelse,
    OpplysningerOmArbeidssoker,
    Profilering,
    Sprak
} from '@navikt/arbeidssokerregisteret-utils';
import { AggregertPeriode } from "../../../types/aggregerte-perioder";
import { Heading, BodyShort } from "@navikt/ds-react";

import { BekreftelseHistorikk } from "./bekreftelse-historikk";
import { OpplysningerHistorikk } from '@/components/historikk/opplysninger-historikk';

export interface Historikk extends AggregertPeriode {
  sprak: Sprak;
}

export function HistorikkWrapper (props: Historikk) {
  const {startet, avsluttet, bekreftelser, opplysningerOmArbeidssoeker, sprak} = props

  return (
    <>
      <Heading level="2" size="large">
        {prettyPrintDato(startet.tidspunkt)} - {avsluttet && avsluttet.tidspunkt ? prettyPrintDato(avsluttet.tidspunkt): 'fortsatt aktiv'}
      </Heading>
      <BodyShort>
        Startet: {prettyPrintDato(startet.tidspunkt)} av {startet.utfoertAv.type}
      </BodyShort>
      <BodyShort>
        Avsluttet: {avsluttet && avsluttet.tidspunkt ? `${prettyPrintDato(avsluttet.tidspunkt)} av ${avsluttet.utfoertAv.type}` : 'fortsatt aktiv'} {}
      </BodyShort>
      <BodyShort>
        Sluttårsak: {avsluttet && avsluttet.aarsak ? avsluttet.aarsak : 'fortsatt aktiv'}
      </BodyShort>
      <BekreftelseHistorikk bekreftelser={bekreftelser} />
      <OpplysningerHistorikk opplysningerOmArbeidssoker={opplysningerOmArbeidssoeker} sprak={sprak} className={'mt-4'}/>
    </>
  )
}
