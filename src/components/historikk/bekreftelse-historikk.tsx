'use client'

import { Bekreftelse } from "@navikt/arbeidssokerregisteret-utils";
import { Heading, ReadMore, Box, BodyShort } from "@navikt/ds-react";

import { prettyPrintDato } from "@/lib/date-utils";

function AlleBekreftelser (props: {bekreftelser: Bekreftelse[]}) {
  const { bekreftelser } = props

  if (bekreftelser.length === 0) return null

  const harMangeBekreftelser = bekreftelser.length > 1
  if (!harMangeBekreftelser) return null

  return (
    <ReadMore header="Se alle bekreftelser fra arbeidssøkerperioden">
      {bekreftelser.map(({periodeId, svar}, index) => {
            return (
      <Box key={index + periodeId} className="p-4" style={{ background: index % 2 !== 0 ? 'var(--a-surface-subtle)' : undefined }}>
        <Heading size="small" level="3">
          {prettyPrintDato(svar.gjelderFra)} - {prettyPrintDato(svar.gjelderTil)}
        </Heading>
        <BodyShort>
          Innsendt {prettyPrintDato(svar.sendtInnAv.tidspunkt)} av {svar.sendtInnAv.utfoertAv.type}
        </BodyShort>
        <BodyShort>
        Jobbet i perioden: {svar.harJobbetIDennePerioden ? 'Ja' : 'Nei'}
        </BodyShort>
        <BodyShort>
        Vil fortsatt være arbeidssøker: {svar.vilFortsetteSomArbeidssoeker ? 'Ja' : 'Nei'}
        </BodyShort>
      </Box>)})}
    </ReadMore>
  )
}

export function BekreftelseHistorikk (props: {bekreftelser: Bekreftelse[]}) {
  const { bekreftelser } = props

  if (bekreftelser.length === 0) return null

  const sisteBekreftelse = bekreftelser[0]

  return (
    <>
      <Heading level="2" size="medium">
        Arbeidsøkerperioden bekreftet
      </Heading>
      <Box className="p-4">
          <Heading size="small" level="3">
            {prettyPrintDato(sisteBekreftelse.svar.gjelderFra)} - {prettyPrintDato(sisteBekreftelse.svar.gjelderTil)}
          </Heading>
          <BodyShort>
            Innsendt {prettyPrintDato(sisteBekreftelse.svar.sendtInnAv.tidspunkt)} av {sisteBekreftelse.svar.sendtInnAv.utfoertAv.type}
          </BodyShort>
          <BodyShort>
          Jobbet i perioden: {sisteBekreftelse.svar.harJobbetIDennePerioden ? 'Ja' : 'Nei'}
          </BodyShort>
          <BodyShort>
          Vil fortsatt være arbeidssøker: {sisteBekreftelse.svar.vilFortsetteSomArbeidssoeker ? 'Ja' : 'Nei'}
          </BodyShort>
      </Box>
      <AlleBekreftelser bekreftelser={bekreftelser} />
    </>
  )
}