import type { Meta, StoryObj } from '@storybook/nextjs';
import LedigeStillingerStateless from '@/components/styrkløft/ledige-stillinger-stateless';

const meta = {
    title: 'Styrkløft/Komponenter/Ledige stillinger',
    component: LedigeStillingerStateless,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof LedigeStillingerStateless>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultLedigStilling: Story = {
    args: {
        sprak: 'nb',
        soek: {},
        resultat: [
            {
                arbeidsplassenNoId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                tittel: 'Nittedal Tannlegesenter har ledig stilling som tannhelsesekretær/tannlegeassistent, er du den rette?',
                stillingbeskrivelse: 'Tannlegeassistent, Tannhelsesekretær, Klinikkassistent',
                selskap: 'Nittedal Tannlegesenter Og Tannlegevakt',
                kommune: 'Nittedal, Norge, Oslo, Akershus',
                soeknadsfrist: {
                    raw: 'Søk senest torsdag 6. november',
                },
                publisert: '',
                land: 'no',
                tags: [],
                sektor: 'Ukjent',
            },
            {
                arbeidsplassenNoId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                tittel: 'Do you want to be part of developing WorldHotels and taking the brand to new heights in Scandinavia?',
                stillingbeskrivelse: 'Head of Performance WorldHotels',
                selskap: 'BWH Hotels Scandinavia',
                kommune: 'Oslo',
                soeknadsfrist: {
                    raw: 'Søk snarest mulig',
                },
                publisert: '',
                land: 'no',
                tags: [],
                sektor: 'Ukjent',
            },
            {
                arbeidsplassenNoId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                tittel: 'Jurist A-krim Oslo',
                stillingbeskrivelse: 'seniorrådgiver',
                selskap: 'Arbeidstilsynet',
                kommune: 'Oslo',
                soeknadsfrist: {
                    raw: 'Søk senest søndag 2. november',
                },
                publisert: '',
                land: 'no',
                tags: [],
                sektor: 'Ukjent',
            },
        ],
        brukPaginering: false,
        onClick: () => {},
        aktivSide: 1,
        antallSider: 1,
        kanSeDirektemeldteStillinger: false,
        aktivFane: 'ledigeStillinger',
        onAktivFaneChange(value) {
            console.log('onAktivFaneChange', value);
        },
    },
};

export const IngenTreff: Story = {
    args: {
        sprak: 'nb',
        soek: {},
        resultat: [],
        brukPaginering: false,
        onClick: () => {},
        aktivSide: 1,
        antallSider: 1,
        kanSeDirektemeldteStillinger: false,
        aktivFane: 'ledigeStillinger',
        onAktivFaneChange(value) {
            console.log('onAktivFaneChange', value);
        },
    },
};

export const MedPaginering: Story = {
    args: {
        sprak: 'nb',
        soek: {},
        resultat: [
            {
                arbeidsplassenNoId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                tittel: 'Nittedal Tannlegesenter har ledig stilling som tannhelsesekretær/tannlegeassistent, er du den rette?',
                stillingbeskrivelse: 'Tannlegeassistent, Tannhelsesekretær, Klinikkassistent',
                selskap: 'Nittedal Tannlegesenter Og Tannlegevakt',
                kommune: 'Nittedal, Norge, Oslo, Akershus',
                soeknadsfrist: {
                    raw: 'Søk senest torsdag 6. november',
                },
                publisert: '',
                land: 'no',
                tags: [],
                sektor: 'Ukjent',
            },
            {
                arbeidsplassenNoId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                tittel: 'Do you want to be part of developing WorldHotels and taking the brand to new heights in Scandinavia?',
                stillingbeskrivelse: 'Head of Performance WorldHotels',
                selskap: 'BWH Hotels Scandinavia',
                kommune: 'Oslo',
                soeknadsfrist: {
                    raw: 'Søk snarest mulig',
                },
                publisert: '',
                land: 'no',
                tags: [],
                sektor: 'Ukjent',
            },
            {
                arbeidsplassenNoId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                tittel: 'Jurist A-krim Oslo',
                stillingbeskrivelse: 'seniorrådgiver',
                selskap: 'Arbeidstilsynet',
                kommune: 'Oslo',
                soeknadsfrist: {
                    raw: 'Søk senest søndag 2. november',
                },
                publisert: '',
                land: 'no',
                tags: [],
                sektor: 'Ukjent',
            },
        ],
        brukPaginering: true,
        onClick: () => {},
        aktivSide: 1,
        antallSider: 2,
        aktivFane: 'ledigeStillinger',
        kanSeDirektemeldteStillinger: false,
        onAktivFaneChange(value) {
            console.log('onAktivFaneChange', value);
        },
    },
};

export const MedDirektemeldteStillinger: Story = {
    args: {
        sprak: 'nb',
        soek: {},
        resultat: [
            {
                arbeidsplassenNoId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                tittel: 'Nittedal Tannlegesenter har ledig stilling som tannhelsesekretær/tannlegeassistent, er du den rette?',
                stillingbeskrivelse: 'Tannlegeassistent, Tannhelsesekretær, Klinikkassistent',
                selskap: 'Nittedal Tannlegesenter Og Tannlegevakt',
                kommune: 'Nittedal, Norge, Oslo, Akershus',
                soeknadsfrist: {
                    raw: 'Søk senest torsdag 6. november',
                },
                publisert: '',
                land: 'no',
                tags: [],
                sektor: 'Ukjent',
            },
            {
                arbeidsplassenNoId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                tittel: 'Do you want to be part of developing WorldHotels and taking the brand to new heights in Scandinavia?',
                stillingbeskrivelse: 'Head of Performance WorldHotels',
                selskap: 'BWH Hotels Scandinavia',
                kommune: 'Oslo',
                soeknadsfrist: {
                    raw: 'Søk snarest mulig',
                },
                publisert: '',
                land: 'no',
                tags: [],
                sektor: 'Ukjent',
            },
            {
                arbeidsplassenNoId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                tittel: 'Jurist A-krim Oslo',
                stillingbeskrivelse: 'seniorrådgiver',
                selskap: 'Arbeidstilsynet',
                kommune: 'Oslo',
                soeknadsfrist: {
                    raw: 'Søk senest søndag 2. november',
                },
                publisert: '',
                land: 'no',
                tags: [],
                sektor: 'Ukjent',
            },
        ],
        brukPaginering: true,
        onClick: () => {},
        aktivSide: 1,
        antallSider: 2,
        aktivFane: 'ledigeStillinger',
        kanSeDirektemeldteStillinger: true,
        onAktivFaneChange(value) {
            console.log('onAktivFaneChange', value);
        },
    },
};

export const MedDirektemeldteStillingerAktiv: Story = {
    args: {
        sprak: 'nb',
        soek: {},
        resultat: [
            {
                arbeidsplassenNoId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                tittel: 'Nittedal Tannlegesenter har ledig stilling som tannhelsesekretær/tannlegeassistent, er du den rette?',
                stillingbeskrivelse: 'Tannlegeassistent, Tannhelsesekretær, Klinikkassistent',
                selskap: 'Nittedal Tannlegesenter Og Tannlegevakt',
                kommune: 'Nittedal, Norge, Oslo, Akershus',
                soeknadsfrist: {
                    raw: 'Søk senest torsdag 6. november',
                },
                publisert: '',
                land: 'no',
                sektor: 'Ukjent',
                tags: ['DIREKTEMELDT_V1'],
            },
            {
                arbeidsplassenNoId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                tittel: 'Do you want to be part of developing WorldHotels and taking the brand to new heights in Scandinavia?',
                stillingbeskrivelse: 'Head of Performance WorldHotels',
                selskap: 'BWH Hotels Scandinavia',
                kommune: 'Oslo',
                soeknadsfrist: {
                    raw: 'Søk snarest mulig',
                },
                publisert: '',
                land: 'no',
                sektor: 'Ukjent',
                tags: ['DIREKTEMELDT_V1'],
            },
            {
                arbeidsplassenNoId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                tittel: 'Jurist A-krim Oslo',
                stillingbeskrivelse: 'seniorrådgiver',
                selskap: 'Arbeidstilsynet',
                kommune: 'Oslo',
                soeknadsfrist: {
                    raw: 'Søk senest søndag 2. november',
                },
                publisert: '',
                land: 'no',
                sektor: 'Ukjent',
                tags: ['DIREKTEMELDT_V1'],
            },
        ],
        brukPaginering: false,
        onClick: () => {},
        aktivSide: 1,
        antallSider: 2,
        aktivFane: 'direktemeldteStillinger',
        kanSeDirektemeldteStillinger: true,
        onAktivFaneChange(value) {
            console.log('onAktivFaneChange', value);
        },
    },
};

export const MedDirektemeldteStillingerIngenTreff: Story = {
    args: {
        sprak: 'nb',
        soek: {},
        resultat: [],
        brukPaginering: false,
        onClick: () => {},
        aktivSide: 1,
        antallSider: 1,
        kanSeDirektemeldteStillinger: true,
        aktivFane: 'ledigeStillinger',
        onAktivFaneChange(value) {
            console.log('onAktivFaneChange', value);
        },
    },
};
