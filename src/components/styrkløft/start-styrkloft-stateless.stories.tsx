import type { Meta, StoryObj } from '@storybook/nextjs';
import { StartStyrkloftStateless } from '@/components/styrkløft/start-styrkloft-stateless';
import { Tjenestestatus } from '@/model/brukerprofil';

const meta = {
    title: 'Styrkløft/Komponenter/StartStyrkløftStateless',
    component: StartStyrkloftStateless,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof StartStyrkloftStateless>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Start: Story = {
    args: {
        onSubmitTjenestestatus(status: Tjenestestatus) {
            console.log('onSubmitTjenestestatus', status);
            return Promise.resolve();
        },
        pendingTjenestestatus: null,
        errorTjenestestatus: null,
        sprak: 'nb',
    },
};

export const MedPendingRequest: Story = {
    args: {
        onSubmitTjenestestatus(status: Tjenestestatus) {
            console.log('onSubmitTjenestestatus', status);
            return Promise.resolve();
        },
        pendingTjenestestatus: 'AKTIV',
        errorTjenestestatus: null,
        sprak: 'nb',
    },
};

export const MedFeil: Story = {
    args: {
        onSubmitTjenestestatus(status: Tjenestestatus) {
            console.log('onSubmitTjenestestatus', status);
            return Promise.resolve();
        },
        pendingTjenestestatus: null,
        errorTjenestestatus: 'Noe gikk galt',
        sprak: 'nb',
    },
};
