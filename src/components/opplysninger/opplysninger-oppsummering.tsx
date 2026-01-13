'use client';

import {
    lagHentTekstForSprak,
    mapNusKodeTilUtdannignsnivaa,
    SPORSMAL_TEKSTER,
    SporsmalId,
    Sprak,
    Svar,
} from '@navikt/arbeidssokerregisteret-utils';
import { FormSummary } from '@navikt/ds-react';
import { loggAktivitet } from '@/lib/tracking';
import { EgenvurderingHendelse, OpplysningerHendelse } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { identity } from '@/lib/utils';

type Props = {
    opplysninger: OpplysningerHendelse;
    egenvurdering?: EgenvurderingHendelse;
    sprak: Sprak;
    oppdaterOpplysningerUrl: string;
    visEndreLink: boolean;
};

const TEKSTER = {
    nb: {
        heading: 'Opplysninger fra registrering',
        linkText: 'Endre svar',
    },
    nn: {
        heading: 'Opplysningar frå registrering',
        linkText: 'Endre svar',
    },
    en: {
        heading: 'Answers from registration',
        linkText: 'Edit',
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

export function mapOpplysninger(
    opplysninger: OpplysningerHendelse,
    egenvurdering?: EgenvurderingHendelse,
): OpplysningProps[] {
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

const OpplysningerOppsummering = (props: Props) => {
    const { opplysninger, egenvurdering, sprak, oppdaterOpplysningerUrl, visEndreLink } = props;
    const besvarelser = mapOpplysninger(opplysninger, egenvurdering);
    const besvarelseTekst = lagHentTekstForSprak(SPORSMAL_TEKSTER, sprak);
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">{tekst('heading')}</FormSummary.Heading>
                {visEndreLink && (
                    <FormSummary.EditLink
                        href={oppdaterOpplysningerUrl}
                        onClick={() => loggAktivitet({ aktivitet: 'Trykker på "Endre opplysninger"' })}
                    >
                        {tekst('linkText')}
                    </FormSummary.EditLink>
                )}
            </FormSummary.Header>
            <FormSummary.Answers>
                {besvarelser.map((besvarelse, idx) => {
                    const { sporsmal, svar } = besvarelse;
                    return (
                        <FormSummary.Answer key={`${sporsmal}-${idx}`}>
                            <FormSummary.Label>{besvarelseTekst(sporsmal)}</FormSummary.Label>
                            <FormSummary.Value>{besvarelseTekst(svar as string) ?? svar}</FormSummary.Value>
                        </FormSummary.Answer>
                    );
                })}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export { OpplysningerOppsummering };
