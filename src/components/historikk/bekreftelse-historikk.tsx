'use client'

import { Bekreftelse } from "@navikt/arbeidssokerregisteret-utils";
import { Heading, Table, ReadMore } from "@navikt/ds-react";

import { prettyPrintDato } from "@/lib/date-utils";

function AlleBekreftelser (props: {bekreftelser: Bekreftelse[]}) {
  const { bekreftelser } = props

  if (bekreftelser.length === 0) return null

  const harMangeBekreftelser = bekreftelser.length > 1
  if (!harMangeBekreftelser) return null

  return (
    <ReadMore header="Se alle bekreftelser fra arbeidssøkerperioden">
      <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Periode</Table.HeaderCell>
          <Table.HeaderCell scope="col">Innsendt dato</Table.HeaderCell>
          <Table.HeaderCell scope="col">Vis alt</Table.HeaderCell>
          {/* 
          <Table.HeaderCell scope="col">Innsendt av</Table.HeaderCell>
          <Table.HeaderCell scope="col">Jobbet i perioden</Table.HeaderCell>
          <Table.HeaderCell scope="col">Vil fortsatt være arbeidssøker</Table.HeaderCell>
          */}
          
        </Table.Row>
      </Table.Header>
      <Table.Body>
          {bekreftelser.map(({periodeId, svar}, i) => {
            return (
              <Table.Row key={i + periodeId}>
                <Table.HeaderCell scope="row">{prettyPrintDato(svar.gjelderFra)} - {prettyPrintDato(svar.gjelderTil)}</Table.HeaderCell>
                <Table.DataCell>{prettyPrintDato(svar.sendtInnAv.tidspunkt)}</Table.DataCell>
                <Table.DataCell>Vis alt</Table.DataCell>
                {/*
                  <Table.DataCell>{svar.sendtInnAv.utfoertAv.type}</Table.DataCell>
                  <Table.DataCell>{svar.harJobbetIDennePerioden ? 'Ja' : 'Nei'}</Table.DataCell>
                  <Table.DataCell>{svar.vilFortsetteSomArbeidssoeker ? 'Ja' : 'Nei'}</Table.DataCell>
                */}
              </Table.Row>
            )
          })}
      </Table.Body>
    </Table>
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
          <Table.HeaderCell scope="col">Vis alt</Table.HeaderCell>
          {/* 
          <Table.HeaderCell scope="col">Innsendt av</Table.HeaderCell>
          <Table.HeaderCell scope="col">Jobbet i perioden</Table.HeaderCell>
          <Table.HeaderCell scope="col">Vil fortsatt være arbeidssøker</Table.HeaderCell>
          */}
          
        </Table.Row>
      </Table.Header>
      <Table.Body>
          
              <Table.Row >
                <Table.HeaderCell scope="row">{prettyPrintDato(sisteBekreftelse.svar.gjelderFra)} - {prettyPrintDato(sisteBekreftelse.svar.gjelderTil)}</Table.HeaderCell>
                <Table.DataCell>{prettyPrintDato(sisteBekreftelse.svar.sendtInnAv.tidspunkt)}</Table.DataCell>
                <Table.DataCell>Vis alt</Table.DataCell>
                {/*
                  <Table.DataCell>{svar.sendtInnAv.utfoertAv.type}</Table.DataCell>
                  <Table.DataCell>{svar.harJobbetIDennePerioden ? 'Ja' : 'Nei'}</Table.DataCell>
                  <Table.DataCell>{svar.vilFortsetteSomArbeidssoeker ? 'Ja' : 'Nei'}</Table.DataCell>
                */}
              </Table.Row>
           
      </Table.Body>
    </Table>
    <AlleBekreftelser bekreftelser={bekreftelser} />
    </>
  )
}