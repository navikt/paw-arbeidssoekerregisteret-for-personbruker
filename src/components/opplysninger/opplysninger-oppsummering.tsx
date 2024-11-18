'use client';

import {
    lagHentTekstForSprak,
    OpplysningerOmArbeidssoker,
    SPORSMAL_TEKSTER,
    Sprak,
} from '@navikt/arbeidssokerregisteret-utils';
import { BehovsvurderingResponse } from '../../../types/behovsvurdering';
import { FormSummary } from '@navikt/ds-react';
import { mapOpplysninger } from '@/components/opplysninger/opplysninger';

type Props = {
    opplysninger: OpplysningerOmArbeidssoker;
    sprak: Sprak;
    behovsvurdering: BehovsvurderingResponse;
    harAktivPeriode: boolean;
    oppdaterOpplysningerUrl: string;
};

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
                    return (
                        <FormSummary.Answer key={`${sporsmal}-${idx}`}>
                            <FormSummary.Label>{tekst(sporsmal)}</FormSummary.Label>
                            <FormSummary.Value>{tekst(svar as string) ?? svar}</FormSummary.Value>
                        </FormSummary.Answer>
                    );
                })}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export { OpplysningerOppsummering };
