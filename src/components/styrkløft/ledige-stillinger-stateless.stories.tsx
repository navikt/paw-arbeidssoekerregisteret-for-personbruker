import type { Meta, StoryObj } from '@storybook/nextjs';
import LedigeStillingerStateless from '@/components/styrkløft/ledige-stillinger-stateless';

const meta = {
    title: 'Styrkløft/Ledige stillinger',
    component: LedigeStillingerStateless,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof LedigeStillingerStateless>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultLedigStilling: Story = {
    args: {
        resultat: [
            {
                uuid: 'uuid',
                tittel: 'Nittedal Tannlegesenter har ledig stilling som tannhelsesekretær/tannlegeassistent, er du den rette?',
                stillingbeskrivelse: 'Tannlegeassistent, Tannhelsesekretær, Klinikkassistent',
                selskap: 'Nittedal Tannlegesenter Og Tannlegevakt',
                kommune: 'Nittedal, Norge, Oslo, Akershus',
                soeknadsfrist: {
                    raw: 'Søk senest torsdag 6. november',
                },
            },
            {
                uuid: 'uuid',
                tittel: 'Do you want to be part of developing WorldHotels and taking the brand to new heights in Scandinavia?',
                stillingbeskrivelse: 'Head of Performance WorldHotels',
                selskap: 'BWH Hotels Scandinavia',
                kommune: 'Oslo',
                soeknadsfrist: {
                    raw: 'Søk snarest mulig',
                },
            },
            {
                uuid: 'uuid',
                tittel: 'Jurist A-krim Oslo',
                stillingbeskrivelse: 'seniorrådgiver',
                selskap: 'Arbeidstilsynet',
                kommune: 'Oslo',
                soeknadsfrist: {
                    raw: 'Søk senest søndag 2. november',
                },
            },
        ],
    },
};
