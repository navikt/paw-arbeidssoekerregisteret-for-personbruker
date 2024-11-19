'use client'

import { Bekreftelse } from "@navikt/arbeidssokerregisteret-utils";
import { Heading, Table, ReadMore, Box, BodyShort } from "@navikt/ds-react";

import { prettyPrintDato } from "@/lib/date-utils";
import { TableDataCell } from "@navikt/ds-react/Table";

function AlleBekreftelser (props: {bekreftelser: Bekreftelse[]}) {
  const { bekreftelser } = props

  if (bekreftelser.length === 0) return null

  const harMangeBekreftelser = bekreftelser.length > 1
  if (!harMangeBekreftelser) return null

  return (
    <ReadMore header="Se alle bekreftelser fra arbeidssøkerperioden">
      {bekreftelser.map(({periodeId, svar}, index) => {
            return (
      <Box key={index + periodeId} className="mb-3" style={{ background: index % 2 !== 0 ? 'var(--a-surface-subtle)' : undefined }}>
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
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Periode</Table.HeaderCell>
          <Table.HeaderCell scope="col">Innsendt dato</Table.HeaderCell>
          <Table.HeaderCell scope="col">Innsendt av</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
              <Table.Row >
                <Table.DataCell>{prettyPrintDato(sisteBekreftelse.svar.gjelderFra)} - {prettyPrintDato(sisteBekreftelse.svar.gjelderTil)}</Table.DataCell>
                <Table.DataCell>{prettyPrintDato(sisteBekreftelse.svar.sendtInnAv.tidspunkt)}</Table.DataCell>
                <Table.DataCell>{sisteBekreftelse.svar.sendtInnAv.utfoertAv.type}</Table.DataCell>
              </Table.Row>
              <Table.Row>
                <TableDataCell colSpan={3}>
                Jobbet i perioden: {sisteBekreftelse.svar.harJobbetIDennePerioden ? 'Ja' : 'Nei'}
                {' '}
                Vil fortsatt være arbeidssøker: {sisteBekreftelse.svar.vilFortsetteSomArbeidssoeker ? 'Ja' : 'Nei'}
                </TableDataCell>
              </Table.Row>
      </Table.Body>
    </Table>
    <AlleBekreftelser bekreftelser={bekreftelser} />
    </>
  )
}