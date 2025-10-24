import type { Meta, StoryObj } from '@storybook/nextjs';
import AktivBrukerStateless from '@/components/styrkløft/aktiv-bruker-stateless';
import { ledigStillingerRespons } from '@/components/styrkløft/styrk-loft.stories';
import { Tjenestestatus } from '@/model/brukerprofil';

const meta = {
    title: 'Styrkløft/Komponenter/Aktiv bruker/Stateless',
    component: AktivBrukerStateless,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof AktivBrukerStateless>;

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
        isEditMode: false,
        visAvmeldModal: false,
    },
};
