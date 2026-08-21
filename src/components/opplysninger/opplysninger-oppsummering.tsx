'use client';

import {
    lagHentTekstForSprak,
    mapNusKodeTilUtdannignsnivaa,
    SPORSMAL_TEKSTER,
    SporsmalId,
    type Sprak,
    type Svar,
} from '@navikt/arbeidssokerregisteret-utils';
import type {
    EgenvurderingHendelse,
    OpplysningerHendelse,
    Snapshot,
} from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { Detail, FormSummary } from '@navikt/ds-react';
import { prettyPrintDato } from '@/lib/date-utils';
import { loggAktivitet } from '@/lib/tracking';
import { identity } from '@/lib/utils';

type Props = {
    snapshot: Snapshot;
    sprak: Sprak;
    oppdaterOpplysningerUrl: string;
    visEndreLink: boolean;
};

const TEKSTER = {
    nb: {
        heading: 'Opplysninger fra registrering',
        linkText: 'Endre svar',
        sistOppdatert: 'Sist oppdatert',
    },
    nn: {
        heading: 'Opplysningar frå registrering',
        linkText: 'Endre svar',
        sistOppdatert: 'Sist oppdatert',
    },
    en: {
        heading: 'Answers from registration',
        linkText: 'Edit',
        sistOppdatert: 'Last updated',
    },
};

type OpplysningProps = { sporsmal: string; svar: Svar | string };

function getSisteStillingSvar(opplysninger: OpplysningerHendelse) {
    const detaljer = opplysninger.jobbsituasjon?.beskrivelser[0]?.detaljer;
    return detaljer?.stilling || 'Ikke oppgitt';
}

function getDinSituasjonSvar(opplysninger: OpplysningerHendelse) {
    const situasjon = opplysninger.jobbsituasjon?.beskrivelser[0];
    return situasjon ? situasjon.beskrivelse : 'Ikke oppgitt';
}

function mapOpplysninger(opplysninger: OpplysningerHendelse, egenvurdering?: EgenvurderingHendelse): OpplysningProps[] {
    return [
        {
            sporsmal: SporsmalId.dinSituasjon,
            svar: getDinSituasjonSvar(opplysninger),
        },
        {
            sporsmal: SporsmalId.sisteStilling,
            svar: getSisteStillingSvar(opplysninger),
        },
        opplysninger.utdanning && {
            sporsmal: SporsmalId.utdanning,
            svar: mapNusKodeTilUtdannignsnivaa(opplysninger.utdanning.nus),
        },
        opplysninger.utdanning?.bestaatt && {
            sporsmal: SporsmalId.utdanningBestatt,
            svar: opplysninger.utdanning.bestaatt,
        },
        opplysninger.utdanning?.bestaatt && {
            sporsmal: SporsmalId.utdanningGodkjent,
            svar: opplysninger.utdanning.godkjent,
        },
        opplysninger.helse && {
            sporsmal: SporsmalId.helseHinder,
            svar: opplysninger.helse.helsetilstandHindrerArbeid,
        },
        opplysninger.annet && {
            sporsmal: SporsmalId.andreForhold,
            svar: opplysninger.annet.andreForholdHindrerArbeid,
        },
        egenvurdering && {
            sporsmal: 'egenvurdering',
            svar: `egenvurdering-${egenvurdering.egenvurdering}`,
        },
    ].filter(identity) as OpplysningProps[];
}

function hentEgenvurdering(snapshot: Snapshot): EgenvurderingHendelse | undefined {
    const opplysningerId = snapshot.opplysning?.id;
    if (!opplysningerId) {
        return undefined;
    } else if (opplysningerId !== snapshot.profilering?.opplysningerOmArbeidssokerId) {
        return undefined;
    } else if (snapshot.profilering.id !== snapshot.egenvurdering?.profileringId) {
        return undefined;
    }

    return snapshot.egenvurdering;
}

const OpplysningerOppsummering = (props: Props) => {
    const { snapshot, sprak, oppdaterOpplysningerUrl, visEndreLink } = props;
    const opplysninger = snapshot.opplysning!;
    const besvarelser = mapOpplysninger(opplysninger, hentEgenvurdering(snapshot));
    const besvarelseTekst = lagHentTekstForSprak(SPORSMAL_TEKSTER, sprak);
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">{tekst('heading')}</FormSummary.Heading>
                <Detail>
                    {tekst('sistOppdatert')}: {prettyPrintDato(opplysninger.sendtInnAv.tidspunkt, sprak)}
                </Detail>
            </FormSummary.Header>
            <FormSummary.Answers>
                {besvarelser.map((besvarelse) => {
                    const { sporsmal, svar } = besvarelse;
                    return (
                        <FormSummary.Answer key={sporsmal}>
                            <FormSummary.Label>{besvarelseTekst(sporsmal)}</FormSummary.Label>
                            <FormSummary.Value>{besvarelseTekst(svar as string) ?? svar}</FormSummary.Value>
                        </FormSummary.Answer>
                    );
                })}
            </FormSummary.Answers>
            {visEndreLink && (
                <FormSummary.Footer>
                    <FormSummary.EditLink
                        href={oppdaterOpplysningerUrl}
                        onClick={() => loggAktivitet({ aktivitet: 'Trykker på "Endre opplysninger"' })}
                    >
                        {tekst('linkText')}
                    </FormSummary.EditLink>
                </FormSummary.Footer>
            )}
        </FormSummary>
    );
};

export { OpplysningerOppsummering };
