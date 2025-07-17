'use client';

import {
    lagHentTekstForSprak,
    OpplysningerMedProfilering,
    SPORSMAL_TEKSTER,
    Sprak,
} from '@navikt/arbeidssokerregisteret-utils';
import { FormSummary } from '@navikt/ds-react';
import { mapOpplysninger } from '@/components/opplysninger/opplysninger';
import { loggAktivitet } from '@/lib/amplitude';

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
