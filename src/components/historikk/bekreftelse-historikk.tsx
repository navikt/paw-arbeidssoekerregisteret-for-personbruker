'use client'

import { Bekreftelse } from "@navikt/arbeidssokerregisteret-utils";
import { Heading, Box, BodyShort, Accordion } from "@navikt/ds-react";

import { prettyPrintDato, prettyPrintDatoOgKlokkeslett } from "@/lib/date-utils";

function AlleBekreftelser (props: {bekreftelser: Bekreftelse[]}) {
  const { bekreftelser } = props

  if (bekreftelser.length === 0) return null

  return (
    <>
      {bekreftelser.map(({periodeId, svar}, index) => {
            return (
      <Box key={index + periodeId} className="p-4 border-b border-b-surface-neutral-active">
        <Heading size="small" level="3">
          {prettyPrintDato(svar.gjelderFra)} - {prettyPrintDato(svar.gjelderTil)}
        </Heading>
        <BodyShort>
          Innsendt {prettyPrintDatoOgKlokkeslett(svar.sendtInnAv.tidspunkt)} av {svar.sendtInnAv.utfoertAv.type}
        </BodyShort>
        <BodyShort>
        Jobbet i perioden: {svar.harJobbetIDennePerioden ? 'Ja' : 'Nei'}
        </BodyShort>
        <BodyShort>
        Vil fortsatt være arbeidssøker: {svar.vilFortsetteSomArbeidssoeker ? 'Ja' : 'Nei'}
        </BodyShort>
      </Box>)})}
      </>
  )
}

export function BekreftelseHistorikk (props: {bekreftelser: Bekreftelse[]}) {
  const { bekreftelser } = props

  if (bekreftelser.length === 0) return null

  return (
    <Box>
      <Heading level="2" size="medium">
        Arbeidsøkerperioden bekreftet
      </Heading>
      <Accordion>
        <Accordion.Item>
          <Accordion.Header>
            Vis alle innsendte bekreftelser
          </Accordion.Header>
          <Accordion.Content>
            <AlleBekreftelser bekreftelser={bekreftelser} />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Box>
  )
}