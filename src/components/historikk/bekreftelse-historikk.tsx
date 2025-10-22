'use client';

import { Bekreftelse, lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Heading, Box, BodyShort, Accordion } from '@navikt/ds-react';

import { prettyPrintDato, prettyPrintDatoOgKlokkeslett } from '@/lib/date-utils';

const TEKSTER = {
    nb: {
        periode: 'Periode',
        av: 'av',
        innsendt: 'Innsendt',
        jobbet: 'Jobbet i perioden',
        fortsette: 'Vil fortsatt være arbeidssøker',
        SLUTTBRUKER: 'bruker',
        SYSTEM: 'Nav',
        VEILEDER: 'veileder',
        bekreftet: 'Arbeidsøkerperioden bekreftet',
        visAlle: 'Vis alle innsendte bekreftelser',
    },
    en: {
        bekreftet: 'Confirmations',
        visAlle: 'Show all confirmations',
    },
};

function AlleBekreftelser(props: { bekreftelser: Bekreftelse[]; sprak: Sprak }) {
    const { bekreftelser, sprak } = props;

    if (bekreftelser.length === 0) return null;

    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <>
            {bekreftelser.map(({ periodeId, svar }, index) => {
                return (
                    <Box
                        key={index + periodeId}
                        className="p-4 border-b border-b-surface-neutral-active last:border-b-0"
                    >
                        <Heading size="small" level="3">
                            {prettyPrintDato(svar.gjelderFra, sprak)} - {prettyPrintDato(svar.gjelderTil, sprak)}
                        </Heading>
                        <dl>
                            <dt className="font-semibold">{tekst('innsendt')}</dt>
                            <dd>
                                {prettyPrintDatoOgKlokkeslett(svar.sendtInnAv.tidspunkt, sprak)} {tekst('av')}{' '}
                                {tekst(svar.sendtInnAv.utfoertAv.type)}
                            </dd>
                            <dt className="font-semibold">{tekst('jobbet')}</dt>
                            <dd>{svar.harJobbetIDennePerioden ? 'Ja' : 'Nei'}</dd>
                            <dt className="font-semibold">{tekst('fortsette')}</dt>
                            <dd>{svar.vilFortsetteSomArbeidssoeker ? 'Ja' : 'Nei'}</dd>
                        </dl>
                    </Box>
                );
            })}
        </>
    );
}

export function BekreftelseHistorikk(props: { bekreftelser: Bekreftelse[]; sprak: Sprak }) {
    const { bekreftelser, sprak } = props;

    if (bekreftelser.length === 0) return null;

    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return (
        <Box>
            <Heading level="2" size="medium">
                {tekst('bekreftet')}
            </Heading>
            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>{tekst('visAlle')}</Accordion.Header>
                    <Accordion.Content>
                        <AlleBekreftelser bekreftelser={bekreftelser} sprak={sprak} />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </Box>
    );
}
