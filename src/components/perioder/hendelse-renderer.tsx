'use client';

import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Hendelse } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { Box } from '@navikt/ds-react';
import React from 'react';
import { Bekreftelse } from './bekreftelse';
import { Hendelse as HendelseKomponent } from './hendelse';
import { PROFILERT_TIL_TEKSTER } from './models';
import { Opplysninger } from './opplysninger';
import { oversettSluttaarsak } from './sluttaarsak';

const TEKSTER = {
    nb: {
        periode_avsluttet: 'Periode avsluttet',
        periode_started: 'Periode startet',
        utfoert_egenvurdering: 'Utført egenvurdering',
        innsending_av_oppslysninger: 'Insendte Opplysninger',
        periode_stoppet: 'Periode stoppet',
        bekreftelse_levert: 'Bekreftelse levert',
        sluttarsak: 'Sluttårsak',
        vurdert_til: 'Vurdert til',
        frist_brutt: 'Frist brutt',
        kilde: 'Kilde',
    },
    nn: {
        periode_avsluttet: 'Periode avslutta',
        periode_started: 'Periode starta',
        utfoert_egenvurdering: 'Utført eigenvurdering',
        innsending_av_oppslysninger: 'Innsendte opplysningar',
        periode_stoppet: 'Periode stoppa',
        bekreftelse_levert: 'Bekreftelse levert',
        sluttarsak: 'Sluttårsak',
        vurdert_til: 'Vurdert til',
        frist_brutt: 'Frist broten',
        kilde: 'Kjelde',
    },

    en: {
        periode_avsluttet: 'Period ended',
        periode_started: 'Period started',
        utfoert_egenvurdering: 'Performed self-assessment',
        innsending_av_oppslysninger: 'Submitted information',
        periode_stoppet: 'Period stopped',
        bekreftelse_levert: 'Confirmation delivered',
        sluttarsak: 'Reason',
        vurdert_til: 'Assessed to',
        frist_brutt: 'Deadline missed',
        kilde: 'Source',
    },
};

type HendelseRendererProps = {
    hendelse: Hendelse;
    sprak: Sprak;
    periodeAvsluttetTidspunkt?: string;
};

const HendelseRenderer: React.FC<HendelseRendererProps> = ({ hendelse, sprak, periodeAvsluttetTidspunkt }) => {
    const sluttaarsak = oversettSluttaarsak(sprak);
    const profileringsTekster = lagHentTekstForSprak(PROFILERT_TIL_TEKSTER, sprak);
    const overskriftTekster = lagHentTekstForSprak(TEKSTER, sprak);

    switch (hendelse.type) {
        case 'PERIODE_STARTET_V1':
            return (
                <HendelseKomponent
                    timestamp={hendelse.tidspunkt}
                    title={overskriftTekster('periode_started')}
                    kilde={hendelse.utfoertAv.type}
                    sprak={sprak}
                />
            );

        case 'PERIODE_AVSLUTTET_V1':
            return (
                <HendelseKomponent
                    timestamp={hendelse.tidspunkt}
                    title={overskriftTekster('periode_avsluttet')}
                    kilde={hendelse.utfoertAv.type}
                    sprak={sprak}
                >
                    <Box as={'p'}>
                        <b>{overskriftTekster('sluttarsak')}</b>
                        {': '}
                        {sluttaarsak(hendelse.aarsak)}
                    </Box>
                </HendelseKomponent>
            );

        case 'EGENVURDERING_V1':
            return (
                <HendelseKomponent
                    timestamp={hendelse.sendtInnAv.tidspunkt}
                    title={overskriftTekster('utfoert_egenvurdering')}
                    kilde={hendelse.sendtInnAv.utfoertAv.type}
                    sprak={sprak}
                >
                    <Box as={'p'}>
                        <b>{overskriftTekster('vurdert_til')}</b>
                        {': '}
                        {profileringsTekster(hendelse.egenvurdering)}
                    </Box>
                </HendelseKomponent>
            );

        case 'OPPLYSNINGER_V4':
            return (
                <HendelseKomponent
                    timestamp={hendelse.sendtInnAv.tidspunkt}
                    title={overskriftTekster('innsending_av_oppslysninger')}
                    kilde={hendelse.sendtInnAv.utfoertAv.type}
                    sprak={sprak}
                >
                    <Opplysninger opplysninger={hendelse} sprak={sprak} />
                </HendelseKomponent>
            );

        case 'PAA_VEGNE_AV_STOPP_V1':
            return (
                <HendelseKomponent
                    timestamp={periodeAvsluttetTidspunkt}
                    title={overskriftTekster('periode_stoppet')}
                    kilde={hendelse.bekreftelsesloesning}
                    sprak={sprak}
                >
                    <Box as={'p'}>
                        <b>{overskriftTekster('sluttarsak')}</b>
                        {': '}
                        {overskriftTekster('frist_brutt')}
                        {/* {sluttaarsak(hendelse.fristBrutt)} */}
                    </Box>
                </HendelseKomponent>
            );

        case 'PAA_VEGNE_AV_START_V1':
            // TODO: Setter vi startdato til starten på perioden, eller "ingen dato"?
            return (
                <HendelseKomponent
                    title={overskriftTekster('periode_startet')}
                    kilde={hendelse.bekreftelsesloesning}
                    sprak={sprak}
                />
            );

        case 'BEKREFTELSE_V1':
            return (
                <HendelseKomponent
                    timestamp={hendelse.svar.gjelderFra}
                    title={overskriftTekster('bekreftelse_levert')}
                    kilde={hendelse.svar.sendtInnAv.utfoertAv.type}
                    sprak={sprak}
                >
                    <Bekreftelse bekreftelse={hendelse} sprak={sprak} />
                </HendelseKomponent>
            );

        case 'PROFILERING_V1':
            return null;

        default: {
            return null;
        }
    }
};

export { HendelseRenderer };
