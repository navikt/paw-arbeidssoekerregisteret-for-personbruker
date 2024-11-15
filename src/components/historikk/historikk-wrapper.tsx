import { prettyPrintDato } from "@/lib/date-utils";
import { ArbeidssokerPeriode, Bekreftelse, OpplysningerOmArbeidssoker, Profilering } from "@navikt/arbeidssokerregisteret-utils";
import { Heading } from "@navikt/ds-react";

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
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </>
  )
}