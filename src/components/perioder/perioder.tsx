'use client';

import { prettyPrintDato } from '@/lib/date-utils';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Periode as PeriodeType } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { Accordion, BodyShort } from '@navikt/ds-react';
import React from 'react';
import { Periode } from './periode';

type PerioderProps = {
    perioder: PeriodeType[] | null;
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
                    <Periode key={periode.periodeId} hendelser={periode.hendelser} sprak={sprak} />
                </Accordion.Item>
            ))}
        </Accordion>
    );
};

export { Perioder };
