import { Hendelse as HendelseType } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { Accordion, Process } from '@navikt/ds-react';
import React from 'react';
import { Hendelse } from './hendelse';
import { Opplysninger } from './opplysninger';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { HendelseRenderer } from './hendelse-renderer';

const TEKSTER = {
    nb: {
        periode_started: 'Registrert som arbeidssøker',
    },
    nn: {
        periode_started: 'Registrert seg som arbeidssøkjar',
    },
    en: {
        periode_started: 'Registered as job seeker',
    },
};

const sortHendelserByTidspunkt = (hendelser: HendelseType[]) => {
    return [...hendelser].sort((a, b) => a.tidspunkt.localeCompare(b.tidspunkt));
};

const shouldMergeFirstTwoHendelser = (sortedHendelser: HendelseType[]): boolean => {
    if (sortedHendelser.length < 2) return false;
    const types = [sortedHendelser[0].type, sortedHendelser[1].type];
    return types.includes('PERIODE_STARTET_V1') && types.includes('OPPLYSNINGER_V4');
};
type PeriodeProps = {
    hendelser: HendelseType[];
    sprak: Sprak;
};

const Periode: React.FC<PeriodeProps> = (props) => {
    const { hendelser, sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const sortedHendelser = sortHendelserByTidspunkt(hendelser);
    const shouldMerge = shouldMergeFirstTwoHendelser(sortedHendelser);

    const periodeStartet = sortedHendelser.find((e) => e.type === 'PERIODE_STARTET_V1');
    const opplysninger = sortedHendelser.find((e) => e.type === 'OPPLYSNINGER_V4');

    const hendelserToRender = shouldMerge ? sortedHendelser.slice(2) : sortedHendelser;

    return (
        <Accordion.Content>
            {shouldMerge && periodeStartet && opplysninger ? (
                <Process>
                    <Hendelse title={tekst('periode_started')} sprak={sprak} timestamp={periodeStartet.tidspunkt}>
                        <Opplysninger opplysninger={opplysninger} sprak={sprak} />
                    </Hendelse>
                    <>
                        {hendelserToRender.map((hendelse, i) => (
                            <HendelseRenderer key={i} hendelse={hendelse} sprak={sprak} />
                        ))}
                    </>
                </Process>
            ) : (
                <Process>
                    {hendelserToRender.map((hendelse, i) => (
                        <HendelseRenderer key={i} hendelse={hendelse} sprak={sprak} />
                    ))}
                </Process>
            )}
        </Accordion.Content>
    );
};

export { Periode };
