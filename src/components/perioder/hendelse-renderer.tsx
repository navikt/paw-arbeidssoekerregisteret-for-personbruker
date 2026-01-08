'use client';

import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { Hendelse } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { Box } from '@navikt/ds-react';
import React from 'react';
import { Bekreftelse } from './bekreftelse';
import { Hendelse as HendelseKomponent } from './hendelse';
import { PROFILERT_TIL_TEKSTER } from './models';
import { Opplysninger } from './opplysninger';
import { oversettSluttaarsak } from './sluttaarsak';

type HendelseRendererProps = {
    hendelse: Hendelse;
    periodeAvsluttetTidspunkt?: string;
};

const HendelseRenderer: React.FC<HendelseRendererProps> = ({ hendelse, periodeAvsluttetTidspunkt }) => {
    const sluttaarsak = oversettSluttaarsak('nb');
    const tekst = lagHentTekstForSprak(PROFILERT_TIL_TEKSTER, 'nb');

    switch (hendelse.type) {
        case 'PERIODE_STARTET_V1':
            return (
                <HendelseKomponent
                    timestamp={hendelse.tidspunkt}
                    title="Periode startet"
                    kilde={hendelse.utfoertAv.type}
                />
            );

        case 'PERIODE_AVSLUTTET_V1':
            return (
                <HendelseKomponent
                    timestamp={hendelse.tidspunkt}
                    title="Periode avsluttet"
                    kilde={hendelse.utfoertAv.type}
                >
                    <Box as={'p'}>
                        <b>Sluttårsak</b>
                        {': '}
                        {sluttaarsak(hendelse.aarsak)}
                    </Box>
                </HendelseKomponent>
            );

        case 'EGENVURDERING_V1':
            return (
                <HendelseKomponent
                    timestamp={hendelse.sendtInnAv.tidspunkt}
                    title="Utført egenvurdering"
                    kilde={hendelse.sendtInnAv.utfoertAv.type}
                >
                    <Box as={'p'}>
                        <b>Vurdert til</b>
                        {': '}
                        {tekst(hendelse.egenvurdering)}
                    </Box>
                </HendelseKomponent>
            );

        case 'OPPLYSNINGER_V4':
            return (
                <HendelseKomponent
                    timestamp={hendelse.sendtInnAv.tidspunkt}
                    title="Insendte Opplysninger"
                    kilde={hendelse.sendtInnAv.utfoertAv.type}
                >
                    <Opplysninger opplysninger={hendelse} />
                </HendelseKomponent>
            );

        case 'PAA_VEGNE_AV_STOPP_V1':
            return (
                <HendelseKomponent
                    timestamp={periodeAvsluttetTidspunkt}
                    title="Periode stoppet"
                    kilde={hendelse.bekreftelsesloesning}
                >
                    <Box as={'p'}>
                        <b>Sluttårsak</b>
                        {': Frist brutt'}
                        {/* {sluttaarsak(hendelse.fristBrutt)} */}
                    </Box>
                </HendelseKomponent>
            );

        case 'PAA_VEGNE_AV_START_V1':
            // TODO: Setter vi startdato til starten på perioden, eller "ingen dato"?
            return <HendelseKomponent title={`Periode startet`} kilde={hendelse.bekreftelsesloesning} />;

        case 'BEKREFTELSE_V1':
            return (
                <HendelseKomponent
                    timestamp={hendelse.svar.gjelderFra}
                    title="Bekreftelse levert"
                    kilde={hendelse.svar.sendtInnAv.utfoertAv.type}
                >
                    <Bekreftelse bekreftelse={hendelse} />
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
