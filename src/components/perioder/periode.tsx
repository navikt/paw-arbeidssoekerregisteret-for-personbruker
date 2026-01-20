import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Hendelse as HendelseType } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { Accordion, Process } from '@navikt/ds-react';
import React from 'react';
import { findOpplysningerMedEgenvurdering, finnEgenvurderingForOpplysninger } from './egenvurdering-mapping';
import { Hendelse } from './hendelse';
import { HendelseRenderer } from './hendelse-renderer';
import { OpplysningerMedEgenvurdering } from './opplysninger-med-egenvurdering';

const TEKSTER = {
    nb: {
        periode_started: 'Registrert som arbeidssøker',
        opplysninger: 'Opplysninger',
        egenvurdering: 'Egenvurdering',
    },
    nn: {
        periode_started: 'Registrert seg som arbeidssøkjar',
        opplysninger: 'Opplysningar',
        egenvurdering: 'Egenvurdering',
    },
    en: {
        periode_started: 'Registered as job seeker',
        opplysninger: 'Information',
        egenvurdering: 'Self-assessment',
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
    const shouldMergeStartWithOpplysninger = shouldMergeFirstTwoHendelser(sortedHendelser);

    const periodeStartet = sortedHendelser.find((e) => e.type === 'PERIODE_STARTET_V1');
    const opplysninger = sortedHendelser.find((e) => e.type === 'OPPLYSNINGER_V4');

    const remainingHendelser = shouldMergeStartWithOpplysninger ? sortedHendelser.slice(2) : sortedHendelser;
    const opplysningerMedEgenvurdering = findOpplysningerMedEgenvurdering(hendelser, remainingHendelser);

    return (
        <Accordion.Content>
            <Process>
                <>
                    {shouldMergeStartWithOpplysninger && periodeStartet && opplysninger && (
                        <Hendelse title={tekst('periode_started')} sprak={sprak} timestamp={periodeStartet.tidspunkt}>
                            <OpplysningerMedEgenvurdering
                                opplysninger={opplysninger}
                                egenvurdering={finnEgenvurderingForOpplysninger(
                                    opplysninger.id,
                                    opplysningerMedEgenvurdering,
                                )}
                                sprak={sprak}
                            />
                        </Hendelse>
                    )}
                </>
                <>
                    {remainingHendelser.map((hendelse, i) => {
                        if (hendelse.type === 'OPPLYSNINGER_V4') {
                            return (
                                <Hendelse
                                    key={hendelse.id}
                                    title={tekst('opplysninger')}
                                    sprak={sprak}
                                    timestamp={hendelse.tidspunkt}
                                >
                                    <OpplysningerMedEgenvurdering
                                        opplysninger={hendelse}
                                        egenvurdering={finnEgenvurderingForOpplysninger(
                                            hendelse.id,
                                            opplysningerMedEgenvurdering,
                                        )}
                                        sprak={sprak}
                                    />
                                </Hendelse>
                            );
                        }
                        return (
                            <HendelseRenderer key={`${i}-${hendelse.tidspunkt}`} hendelse={hendelse} sprak={sprak} />
                        );
                    })}
                </>
            </Process>
        </Accordion.Content>
    );
};

export { Periode };
