import type { Meta, StoryObj } from '@storybook/nextjs';
import { StartStyrkloftStateless } from '@/components/styrkløft/start-styrkloft-stateless';
import { Tjenestestatus } from '@/model/brukerprofil';

const meta = {
    title: 'Styrkløft/StartStyrkløftStateless',
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
        onSubmitStillingsSoek(data: any) {
            console.log('onSubmitStillingsSoek', data);
            return Promise.resolve();
        },
        visGodkjennEksperiment: true,
        visVelgFiltere: false,
        visAvmeldtKvittering: false,
        pendingTjenestestatus: null,
        errorTjenestestatus: null,
        sprak: 'nb',
    },
};

export const ValgtVisStillinger: Story = {
    args: {
        onSubmitTjenestestatus(status: Tjenestestatus) {
            console.log('onSubmitTjenestestatus', status);
            return Promise.resolve();
        },
        onSubmitStillingsSoek(data: any) {
            console.log('onSubmitStillingsSoek', data);
            return Promise.resolve();
        },
        visGodkjennEksperiment: false,
        visVelgFiltere: true,
        visAvmeldtKvittering: false,
        pendingTjenestestatus: null,
        errorTjenestestatus: null,
        sprak: 'nb',
    },
};

export const ValgtNeiTakk: Story = {
    args: {
        onSubmitTjenestestatus(status: Tjenestestatus) {
            console.log('onSubmitTjenestestatus', status);
            return Promise.resolve();
        },
        onSubmitStillingsSoek(data: any) {
            console.log('onSubmitStillingsSoek', data);
            return Promise.resolve();
        },
        visGodkjennEksperiment: false,
        visVelgFiltere: false,
        visAvmeldtKvittering: true,
        pendingTjenestestatus: null,
        errorTjenestestatus: null,
        sprak: 'nb',
    },
};
