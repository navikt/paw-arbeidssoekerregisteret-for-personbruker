'use client';

import {
    lagHentTekstForSprak,
    OpplysningerOmArbeidssoker,
    SPORSMAL_TEKSTER,
    Sprak,
} from '@navikt/arbeidssokerregisteret-utils';
import { FormSummary } from '@navikt/ds-react';
import { mapOpplysninger } from '@/components/opplysninger/opplysninger';
import { loggAktivitet } from '@/lib/amplitude';
import { OpplysningerMedProfilering } from '../../../types/aggregerte-perioder';

type Props = {
    opplysninger: OpplysningerMedProfilering;
    sprak: Sprak;
    oppdaterOpplysningerUrl: string;
    visEndreLink: boolean;
};

const TEKSTER = {
    nb: {
        heading: 'Opplysninger fra registrering',
        linkText: 'Endre svar',
        egenvurderingLabel: 'Ønsker du veiledning fra Nav?',
        ANTATT_GODE_MULIGHETER: 'Ønsker å klare meg selv',
        ANTATT_BEHOV_FOR_VEILEDNING: 'Ønsker hjelp fra en veileder',
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

const OpplysningerOppsummering = (props: Props) => {
    const { opplysninger, sprak, oppdaterOpplysningerUrl, visEndreLink } = props;
    const besvarelser = mapOpplysninger(opplysninger, sprak);
    const besvarelseTekst = lagHentTekstForSprak(SPORSMAL_TEKSTER, sprak);
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const harEgenvurdering = Boolean(opplysninger?.profilering?.egenvurdering);
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
                {harEgenvurdering && (
                    <FormSummary.Answer>
                        <FormSummary.Label>{tekst('egenvurderingLabel')}</FormSummary.Label>
                        <FormSummary.Value>
                            {tekst(opplysninger.profilering.egenvurdering?.egenvurdering as string)}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export { OpplysningerOppsummering };
