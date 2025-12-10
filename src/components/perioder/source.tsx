import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { Tag } from '@navikt/ds-react';
import React from 'react';

export const TEKSTER = {
    nb: {
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
};

type SourceProps = {
    source: string;
};

const Source: React.FC<SourceProps> = (props) => {
    const { source } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, 'nb');

    return (
        <Tag size="small" variant="info" className="sm:ml-auto">
            <span>{'Kilde: '}</span>
            <span>{tekst(source)}</span>
        </Tag>
    );
};

export { Source };
