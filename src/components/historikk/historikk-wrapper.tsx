import { prettyPrintDato } from "@/lib/date-utils";
import { ArbeidssokerPeriode, Bekreftelse, OpplysningerOmArbeidssoker, Profilering } from "@navikt/arbeidssokerregisteret-utils";
import { Heading, BodyShort } from "@navikt/ds-react";

import { BekreftelseHistorikk } from "./bekreftelse-historikk";

export interface Historikk extends ArbeidssokerPeriode {
  bekreftelser: Bekreftelse[];
  opplysningerOmArbeidssoeker: OpplysningerOmArbeidssoker[];
  profilering: Profilering[]
}

export function HistorikkWrapper (props: Historikk) {
  const {startet, avsluttet, bekreftelser, profilering, opplysningerOmArbeidssoeker} = props

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
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </>
  )
}