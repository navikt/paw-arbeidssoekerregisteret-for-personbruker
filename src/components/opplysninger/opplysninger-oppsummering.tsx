'use client';

import {
    lagHentTekstForSprak,
    mapNusKodeTilUtdannignsnivaa,
    OpplysningerOmArbeidssoker, SPORSMAL_TEKSTER,
    SporsmalId,
    Sprak, Svar
} from '@navikt/arbeidssokerregisteret-utils';
import { BehovsvurderingResponse } from '../../../types/behovsvurdering';
import { FormSummary } from '@navikt/ds-react';
import { identity } from '@/lib/utils';

type Props = {
    opplysninger: OpplysningerOmArbeidssoker;
    sprak: Sprak;
    behovsvurdering: BehovsvurderingResponse;
    harAktivPeriode: boolean;
    oppdaterOpplysningerUrl: string;
};

type OpplysningProps = { sporsmal: string; svar: Svar | string };

function getSisteStillingSvar(opplysninger: OpplysningerOmArbeidssoker) {
    const detaljer = opplysninger.jobbsituasjon[0]?.detaljer;
    return detaljer?.stilling || 'Ikke oppgitt';
}

function getDinSituasjonSvar(opplysninger: OpplysningerOmArbeidssoker) {
    const situasjon = opplysninger.jobbsituasjon[0];
    return situasjon ? situasjon.beskrivelse : 'Ikke oppgitt';
}

function mapOpplysninger(opplysninger: OpplysningerOmArbeidssoker, sprak: Sprak): OpplysningProps[] {
    const result: OpplysningProps[] = [
        {
            sporsmal: SporsmalId.dinSituasjon,
            svar: getDinSituasjonSvar(opplysninger),
        },
        {
            sporsmal: SporsmalId.sisteStilling,
            svar: getSisteStillingSvar(opplysninger),
        },
        {
            sporsmal: SporsmalId.utdanning,
            svar: mapNusKodeTilUtdannignsnivaa(opplysninger.utdanning.nus),
        },
        opplysninger.utdanning.bestaatt && {
            sporsmal: SporsmalId.utdanningBestatt,
            svar: opplysninger.utdanning.bestaatt,
        },
        opplysninger.utdanning.bestaatt && {
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
    ].filter(identity);

    return result;
}

const OpplysningerOppsummering = (props: Props) => {
    const { opplysninger, sprak, oppdaterOpplysningerUrl } = props;
    const besvarelser = mapOpplysninger(opplysninger, sprak);
    const tekst = lagHentTekstForSprak(SPORSMAL_TEKSTER, props.sprak);

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">Opplysninger fra registrering</FormSummary.Heading>
                <FormSummary.EditLink href={oppdaterOpplysningerUrl} />
            </FormSummary.Header>
            <FormSummary.Answers>
            {besvarelser.map((besvarelse, idx) => {
                const { sporsmal, svar } = besvarelse;
                return <FormSummary.Answer key={`${sporsmal}-${idx}`}>
                    <FormSummary.Label>{tekst(sporsmal)}</FormSummary.Label>
                    <FormSummary.Value>{tekst(svar as string) ?? svar}</FormSummary.Value>
                </FormSummary.Answer>
            })}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export { OpplysningerOppsummering };
