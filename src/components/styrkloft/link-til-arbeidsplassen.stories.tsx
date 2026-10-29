import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Brukerprofil, type StedSoek } from '@/model/brukerprofil';
import { LinkTilArbeidsplassen } from './link-til-arbeidsplassen';

const meta = {
    title: 'Styrkløft/Komponenter/Link til arbeidsplassen',
    component: LinkTilArbeidsplassen,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof LinkTilArbeidsplassen>;

export default meta;
type Story = StoryObj<typeof meta>;

const stedSoek: StedSoek = {
    soekType: 'STED_SOEK_V1',
    fylker: [
        {
            navn: 'Buskerud',
            kommuner: [
                {
                    navn: 'Bergen',
                    kommunenummer: '4601',
                },
            ],
            fylkesnummer: '33',
        },
        {
            navn: 'Oslo',
            kommuner: [],
            fylkesnummer: '03',
        },
    ],
    soekeord: ['Utvikler'],
    styrk08: ['2514', '2166', '2320', '3121'],
};

const stedSoekArgs = {
    stedSoek,
};

export const Bokmal: Story = {
    args: {
        ...stedSoekArgs,
        sprak: 'nb',
    },
};

export const Nynorsk: Story = {
    args: {
        ...stedSoekArgs,
        sprak: 'nn',
    },
};

export const English: Story = {
    args: {
        ...stedSoekArgs,
        sprak: 'en',
    },
};
