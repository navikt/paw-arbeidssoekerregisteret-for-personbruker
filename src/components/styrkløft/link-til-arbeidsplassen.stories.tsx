import { Meta, StoryObj } from '@storybook/nextjs';
import { LinkTilArbeidsplassen } from './link-til-arbeidsplassen';
import { Brukerprofil, StedSoek } from '@/model/brukerprofil';

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

export const DefaultLinkTilArbeidsplassen: Story = {
    args: {
        stedSoek: stedSoek,
        sprak: 'nb',
    },
};
