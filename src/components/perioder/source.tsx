import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Tag } from '@navikt/ds-react';
import React from 'react';

export const TEKSTER = {
    nb: {
        kilde: 'Kilde',
        SLUTTBRUKER: 'Bruker',
        SYSTEM: 'System',
        VEILEDER: 'Veileder',
        DAGPENGER: 'Dagpenger',
        FRIST_BRUTT: 'Meldeplikt brutt',
        SLETTET: 'Slettet på grunn av feilregistrering',
        'SLUTTBRUKER / ARBEIDSSOEKERREGISTERET': 'Bruker/Registeret',
        'SLUTTBRUKER / DAGPENGER': 'Bruker/Dagpenger',
        'SLUTTBRUKER / FRISKMELDT_TIL_ARBEIDSFORMIDLING': 'Bruker/Sykepenger',
        'VEILEDER / ARBEIDSSOEKERREGISTERET': 'Veileder/Registeret',
        'VEILEDER / DAGPENGER': 'Veileder/Dagpenger',
        'VEILEDER / FRISKMELDT_TIL_ARBEIDSFORMIDLING': 'Veileder/Sykepenger',
        GYLDIG: 'Gyldig',
        UVENTET_KILDE: 'Uventet kilde',
        UTENFOR_PERIODE: 'Utenfor periode',
        ANTATT_GODE_MULIGHETER: 'Gode muligheter',
        ANTATT_BEHOV_FOR_VEILEDNING: 'Behov for veiledning',
        OPPGITT_HINDRINGER: 'Oppgitt hindringer',
        UKJENT_VERDI: 'Ukjent verdi',
    },
    nn: {
        kilde: 'Kjelde',
        SLUTTBRUKER: 'Brukar',
        SYSTEM: 'System',
        VEILEDER: 'Rettleiar',
        DAGPENGER: 'Dagpengar',
        FRIST_BRUTT: 'Meldeplikt broten',
        SLETTET: 'Sletta på grunn av feilregistrering',
        'SLUTTBRUKER / ARBEIDSSOEKERREGISTERET': 'Brukar/Registeret',
        'SLUTTBRUKER / DAGPENGER': 'Brukar/Dagpengar',
        'SLUTTBRUKER / FRISKMELDT_TIL_ARBEIDSFORMIDLING': 'Brukar/Sjukepengar',
        'VEILEDER / ARBEIDSSOEKERREGISTERET': 'Rettleiar/Registeret',
        'VEILEDER / DAGPENGER': 'Rettleiar/Dagpengar',
        'VEILEDER / FRISKMELDT_TIL_ARBEIDSFORMIDLING': 'Rettleiar/Sjukepengar',
        GYLDIG: 'Gyldig',
        UVENTET_KILDE: 'Uventa kjelde',
        UTENFOR_PERIODE: 'Utanfor periode',
        ANTATT_GODE_MULIGHETER: 'Gode moglegheiter',
        ANTATT_BEHOV_FOR_VEILEDNING: 'Behov for rettleiing',
        OPPGITT_HINDRINGER: 'Oppgitt hindringar',
        UKJENT_VERDI: 'Ukjend verdi',
    },
    en: {
        kilde: 'Source',
        SLUTTBRUKER: 'User',
        SYSTEM: 'System',
        VEILEDER: 'Supervisor',
        DAGPENGER: 'Dagpenger',
        FRIST_BRUTT: 'Reporting obligation missed',
        SLETTET: 'Deleted due to incorrect registration',
        'SLUTTBRUKER / ARBEIDSSOEKERREGISTERET': 'User/Register',
        'SLUTTBRUKER / DAGPENGER': 'User/Unemployment benefits',
        'SLUTTBRUKER / FRISKMELDT_TIL_ARBEIDSFORMIDLING': 'User/Sick pay',
        'VEILEDER / ARBEIDSSOEKERREGISTERET': 'Supervisor/Register',
        'VEILEDER / DAGPENGER': 'Supervisor/Unemployment benefits',
        'VEILEDER / FRISKMELDT_TIL_ARBEIDSFORMIDLING': 'Supervisor/Sick pay',
        GYLDIG: 'Valid',
        UVENTET_KILDE: 'Unexpected source',
        UTENFOR_PERIODE: 'Outside period',
        ANTATT_GODE_MULIGHETER: 'Good opportunities',
        ANTATT_BEHOV_FOR_VEILEDNING: 'Need for guidance',
        OPPGITT_HINDRINGER: 'Stated obstacles',
        UKJENT_VERDI: 'Unknown value',
    },
};

type SourceProps = {
    source: string;
    sprak: Sprak;
};

const Source: React.FC<SourceProps> = (props) => {
    const { source, sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Tag size="small" variant="info" className="sm:ml-auto">
            <span>
                {tekst('kilde')}
                {':'}&nbsp;
            </span>
            <span>{tekst(source)}</span>
        </Tag>
    );
};

export { Source };
