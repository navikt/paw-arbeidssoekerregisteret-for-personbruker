import type { Meta, StoryObj } from '@storybook/nextjs';
import StyrkLoft from '@/components/styrkløft/styrk-loft';
import AktivBruker from '@/components/styrkløft/aktiv-bruker';
import { Tjenestestatus } from '@/model/brukerprofil';
import { ledigStillingerRespons } from '@/components/styrkløft/styrk-loft.stories';

const meta = {
    title: 'Styrkløft/Komponenter/Aktiv bruker',
    component: AktivBruker,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof StyrkLoft>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onFetchStillinger() {
            return Promise.resolve(ledigStillingerRespons);
        },
        onSubmitTjenestestatus: (status: Tjenestestatus) => Promise.resolve(),
        onSubmitStillingsSoek: (data: any) => Promise.resolve(),
        sprak: 'nb',
    },
};
