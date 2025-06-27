'use client';

import { lagHentTekstForSprak, OpplysningerOmArbeidssoker, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Accordion, Heading } from '@navikt/ds-react';
import Opplysninger from '@/components/opplysninger/opplysninger';
import { prettyPrintDato } from '@/lib/date-utils';
import React from 'react';
import { OpplysningerMedProfilering } from '../../../types/aggregerte-perioder';

const TEKSTER = {
    nb: {
        heading: 'Registrerte opplysninger',
        sendtInn: 'Sendt inn ',
    },
    en: {
        heading: 'Information',
        sendtInn: 'Registered '
    }
};
interface Props extends React.HTMLProps<any> {
    opplysningerOmArbeidssoker: OpplysningerMedProfilering[];
    sprak: Sprak;
}
export function OpplysningerHistorikk(props: Props) {
    const { opplysningerOmArbeidssoker, sprak } = props;

    if (!opplysningerOmArbeidssoker || opplysningerOmArbeidssoker.length === 0) return null;

    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <div className={props.className ?? ''}>
            <Heading level="2" size="medium">
                {tekst('heading')}
            </Heading>
            <Accordion>
                {opplysningerOmArbeidssoker.map((opplysninger) => {
                    return (
                        <Accordion.Item key={opplysninger.opplysningerOmArbeidssoekerId}>
                            <Accordion.Header>
                                {tekst('sendtInn')} {prettyPrintDato(opplysninger.sendtInnAv.tidspunkt, sprak)}
                            </Accordion.Header>
                            <Accordion.Content>
                                <Opplysninger opplysninger={opplysninger} sprak={sprak} />
                            </Accordion.Content>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        </div>
    );
}
