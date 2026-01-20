'use client';

import { BekreftelseStatus, lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import {
    Hendelse,
    OpplysningerHendelse,
    PeriodeStartetHendelse,
} from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { Box } from '@navikt/ds-react';
import React from 'react';
import { Bekreftelse } from './bekreftelse';
import { Hendelse as HendelseKomponent } from './hendelse';
import { PROFILERT_TIL_TEKSTER } from './models';
import { Opplysninger } from './opplysninger';
import { oversettSluttaarsak } from './sluttaarsak';

const TEKSTER = {
    nb: {
        periode_avsluttet: 'Ikke lengre registrert som arbeidssøker',
        periode_started: 'Registrert som arbeidssøker',
        periode_started_sys: 'Registrert som arbeidssøker av',
        innsending_av_oppslysninger: 'Du sendte inn opplysninger',
        innsending_av_oppslysninger_veil: 'Veileder sendte inn opplysninger',
        bekreftelse_levert: 'Bekreftelse levert',
        sluttarsak: 'Sluttårsak',
        vurdert_til: 'Vurdert til',
        frist_brutt: 'Frist brutt',
        kilde: 'Kilde',
        profilering: 'Profilering',
        SYSTEM: 'Nav',
        VEILEDER: 'veileder',
    },
    nn: {
        periode_avsluttet: 'Ikkje lengre registrert som arbeidssøkjar',
        periode_started: 'Registrert seg som arbeidssøkjar',
        periode_started_sys: 'Registrert som arbeidssøkjar av',
        innsending_av_oppslysninger: 'Du sende inn opplysningar',
        innsending_av_oppslysninger_veil: 'Rettleiar sende inn opplysningar',
        bekreftelse_levert: 'Bekreftelse levert',
        sluttarsak: 'Sluttårsak',
        vurdert_til: 'Vurdert til',
        frist_brutt: 'Frist broten',
        kilde: 'Kjelde',
        profilering: 'Profilering',
        SYSTEM: 'Nav',
        VEILEDER: 'rettleiar',
    },

    en: {
        periode_avsluttet: 'No longer registered as job seeker',
        periode_started: 'Registered as job seeker',
        periode_started_sys: 'Registered as job seeker by',
        innsending_av_oppslysninger: 'You submitted information',
        innsending_av_oppslysninger_veil: 'Supervisor submitted information',
        bekreftelse_levert: 'Confirmation delivered',
        sluttarsak: 'Reason',
        vurdert_til: 'Assessed to',
        frist_brutt: 'Deadline missed',
        kilde: 'Source',
        profilering: 'Profiling',
        SYSTEM: 'Nav',
        VEILEDER: 'supervisor',
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

    const opprettHeadingTilPeriodeStartet = (_hendelse: PeriodeStartetHendelse) => {
        const opprettetAvBruker = _hendelse.sendtInnAv.utfoertAv.type === 'SLUTTBRUKER';
        if (!opprettetAvBruker) {
            const doneBy = _hendelse.sendtInnAv.utfoertAv.type;
            return `${overskriftTekster('periode_started_sys')} ${overskriftTekster(doneBy)}`;
        }
        return overskriftTekster('periode_started');
    };

    const opprettHeadingTilOpplysninger = (_hendelse: OpplysningerHendelse) => {
        const opprettetAvBruker = _hendelse.sendtInnAv.utfoertAv.type === 'SLUTTBRUKER';
        if (!opprettetAvBruker) {
            return `${overskriftTekster('innsending_av_oppslysninger_veil')}`;
        }
        return `${overskriftTekster('innsending_av_oppslysninger')}`;
    };

    switch (hendelse.type) {
        case 'PERIODE_STARTET_V1':
            return (
                <HendelseKomponent
                    timestamp={hendelse.tidspunkt}
                    title={opprettHeadingTilPeriodeStartet(hendelse)}
                    sprak={sprak}
                />
            );

        case 'PERIODE_AVSLUTTET_V1':
            return (
                <HendelseKomponent
                    timestamp={hendelse.tidspunkt}
                    title={overskriftTekster('periode_avsluttet')}
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
            // Denne renderes i periode.tsx
            return null;

        case 'OPPLYSNINGER_V4':
            return (
                <HendelseKomponent
                    timestamp={hendelse.tidspunkt}
                    title={opprettHeadingTilOpplysninger(hendelse)}
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
                    sprak={sprak}
                >
                    <Bekreftelse bekreftelse={hendelse} sprak={sprak} />
                </HendelseKomponent>
            );

        case 'PROFILERING_V1':
            return null;

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
