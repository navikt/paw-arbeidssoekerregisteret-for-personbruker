'use client';

import React from 'react';
import { prettyPrintDato } from '@/lib/date-utils';
import { Periode } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { Accordion, BodyShort, Process } from '@navikt/ds-react';
import { HendelseRenderer } from './hendelse-renderer';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';

type PerioderProps = {
    perioder: Periode[] | null;
    sprak: Sprak;
};

const TEKSTER = {
    nb: {
        fortsatt_paagaaende: 'Fortsatt pågående',
    },
    nn: {
        fortsatt_paagaaende: 'Framleis aktiv',
    },
    en: {
        fortsatt_paagaaende: 'Still active',
    },
};

const Perioder: React.FC<PerioderProps> = ({ perioder, sprak }) => {
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Accordion>
            {perioder?.map((periode) => (
                <Accordion.Item key={periode.periodeId}>
                    <Accordion.Header>
                        <BodyShort>
                            {prettyPrintDato(periode.startet, sprak)} -{' '}
                            {periode.avsluttet
                                ? prettyPrintDato(periode.avsluttet, sprak)
                                : tekst('fortsatt_paagaaende')}
                        </BodyShort>
                    </Accordion.Header>
                    <Accordion.Content>
                        <Process>
                            {periode.hendelser
                                .sort((a, b) => a.tidspunkt.localeCompare(b.tidspunkt))
                                .map((hendelse, i) => (
                                    <HendelseRenderer key={i} hendelse={hendelse} sprak={sprak} />
                                ))}
                        </Process>
                    </Accordion.Content>
                </Accordion.Item>
            ))}
        </Accordion>
    );
};

export { Perioder };
