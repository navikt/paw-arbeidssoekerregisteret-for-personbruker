import type { Meta, StoryObj } from '@storybook/nextjs';
import StyrkLoftStatic from '@/components/styrkløft/styrk-loft-static';
import { Tjenestestatus } from '@/model/brukerprofil';

const meta = {
    title: 'Styrkløft/Styrkløft static',
    component: StyrkLoftStatic,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof StyrkLoftStatic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        brukerprofil: {
            identitetsnummer: '42',
            tjenestestatus: 'INAKTIV',
        },
        onSubmitTjenestestatus(status: Tjenestestatus) {
            console.log('onSubmitTjenestestatus', status);
            return Promise.resolve();
        },
        onSubmitStillingsSoek(data: any) {
            console.log('onSubmitStillingsSoek', data);
            return Promise.resolve();
        },
        onFetchStillinger() {
            return Promise.resolve({});
        },
        sprak: 'nb',
    },
};
