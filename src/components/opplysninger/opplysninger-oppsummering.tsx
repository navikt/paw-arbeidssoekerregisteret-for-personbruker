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

type Props = {
    opplysninger: OpplysningerOmArbeidssoker;
    sprak: Sprak;
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
                <FormSummary.EditLink
                    href={oppdaterOpplysningerUrl}
                    onClick={() => loggAktivitet({ aktivitet: 'Trykker på "Endre opplysninger"' })}
                />
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
