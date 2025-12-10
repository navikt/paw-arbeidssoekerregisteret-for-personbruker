'use client';

import React from 'react';
import { prettyPrintDato } from '@/lib/date-utils';
import { Periode } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { Accordion, BodyShort } from '@navikt/ds-react';
import { HendelseRenderer } from './hendelse-renderer';

type PerioderProps = {
    perioder: Periode[] | null;
};

const Perioder: React.FC<PerioderProps> = ({ perioder }) => {
    return (
        <div>
            <Accordion>
                {perioder?.map((periode) => (
                    <Accordion.Item key={periode.periodeId}>
                        <Accordion.Header>
                            <BodyShort>
                                {prettyPrintDato(periode.startet, 'nb')} -{' '}
                                {periode.avsluttet ? prettyPrintDato(periode.avsluttet, 'nb') : 'fortsatt pågående'}
                            </BodyShort>
                        </Accordion.Header>
                        <Accordion.Content>
                            <div>
                                {periode.hendelser.map((hendelse, i) => (
                                    <HendelseRenderer
                                        key={i}
                                        hendelse={hendelse}
                                        periodeAvsluttetTidspunkt={periode.avsluttet}
                                    />
                                ))}
                            </div>
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
};

export { Perioder };
