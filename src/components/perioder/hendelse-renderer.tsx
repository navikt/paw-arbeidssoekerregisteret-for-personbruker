'use client';

import { BekreftelseStatus, lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
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
        bekreftelse_levert: 'Bekreftelse levert',
        sluttarsak: 'Sluttårsak',
        vurdert_til: 'Vurdert til',
        frist_brutt: 'Frist brutt',
        kilde: 'Kilde',
        profilering: 'Profilering',
    },
    nn: {
        periode_avsluttet: 'Periode avslutta',
        periode_started: 'Periode starta',
        utfoert_egenvurdering: 'Utført eigenvurdering',
        innsending_av_oppslysninger: 'Innsendte opplysningar',
        bekreftelse_levert: 'Bekreftelse levert',
        sluttarsak: 'Sluttårsak',
        vurdert_til: 'Vurdert til',
        frist_brutt: 'Frist broten',
        kilde: 'Kjelde',
        profilering: 'Profilering',
    },

    en: {
        periode_avsluttet: 'Period ended',
        periode_started: 'Period started',
        utfoert_egenvurdering: 'Performed self-assessment',
        innsending_av_oppslysninger: 'Submitted information',
        bekreftelse_levert: 'Confirmation delivered',
        sluttarsak: 'Reason',
        vurdert_til: 'Assessed to',
        frist_brutt: 'Deadline missed',
        kilde: 'Source',
        profilering: 'Profiling',
    },
};

type HendelseRendererProps = {
    hendelse: Hendelse;
    sprak: Sprak;
};

const HendelseRenderer: React.FC<HendelseRendererProps> = ({ hendelse, sprak }) => {
    const sluttaarsak = oversettSluttaarsak(sprak);
    const profileringsTekster = lagHentTekstForSprak(PROFILERT_TIL_TEKSTER, sprak);
    const overskriftTekster = lagHentTekstForSprak(TEKSTER, sprak);

    switch (hendelse.type) {
        case 'PERIODE_STARTET_V1':
            return (
                <HendelseKomponent
                    timestamp={hendelse.tidspunkt}
                    title={overskriftTekster('periode_started')}
                    kilde={hendelse.sendtInnAv.utfoertAv.type}
                    sprak={sprak}
                />
            );

        case 'PERIODE_AVSLUTTET_V1':
            return (
                <HendelseKomponent
                    timestamp={hendelse.tidspunkt}
                    title={overskriftTekster('periode_avsluttet')}
                    kilde={hendelse.sendtInnAv.utfoertAv.type}
                    sprak={sprak}
                >
                    <Box as={'p'}>
                        <b>{overskriftTekster('sluttarsak')}</b>
                        {': '}
                        {sluttaarsak(hendelse.sendtInnAv.aarsak)}
                    </Box>
                </HendelseKomponent>
            );

        case 'EGENVURDERING_V1':
            return (
                <HendelseKomponent
                    timestamp={hendelse.tidspunkt}
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
                    timestamp={hendelse.tidspunkt}
                    title={overskriftTekster('innsending_av_oppslysninger')}
                    kilde={hendelse.sendtInnAv.utfoertAv.type}
                    sprak={sprak}
                >
                    <Opplysninger opplysninger={hendelse} sprak={sprak} />
                </HendelseKomponent>
            );

        case 'BEKREFTELSE_V1':
            if (hendelse.status !== BekreftelseStatus.GYLDIG) return null;
            return (
                <HendelseKomponent
                    timestamp={hendelse.tidspunkt}
                    title={overskriftTekster('bekreftelse_levert')}
                    kilde={hendelse.svar.sendtInnAv.utfoertAv.type}
                    sprak={sprak}
                >
                    <Bekreftelse bekreftelse={hendelse} sprak={sprak} />
                </HendelseKomponent>
            );

        case 'PROFILERING_V1':
            return (
                <HendelseKomponent
                    timestamp={hendelse.tidspunkt}
                    title={overskriftTekster('profilering')}
                    kilde={hendelse.sendtInnAv.utfoertAv.type}
                    sprak={sprak}
                />
            );

        // Aktivt valg å ikke vise "på vegne av" hendelser - ikke av interesse, kun for intern bruk
        case 'PAA_VEGNE_AV_STOPP_V1':
            return null;

        case 'PAA_VEGNE_AV_START_V1':
            return null;

        default: {
            return null;
        }
    }
};

export { HendelseRenderer };
