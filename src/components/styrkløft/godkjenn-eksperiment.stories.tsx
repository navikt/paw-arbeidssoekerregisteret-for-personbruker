import type { Meta, StoryObj } from '@storybook/nextjs';
import GodkjennEksperiment from '@/components/styrkløft/godkjenn-eksperiment';

const meta = {
    title: 'Styrkløft/Godkjenn eksperiment',
    component: GodkjennEksperiment,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof GodkjennEksperiment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ubesvart: Story = {
    args: {
        sprak: 'nb',
        onSubmit(val) {
            console.log('onSubmit', val);
            return Promise.resolve();
        },
    },
};

export const PendingGodkjentRequest: Story = {
    args: {
        sprak: 'nb',
        onSubmit(val) {
            console.log('onSubmit', val);
            return Promise.resolve();
        },
        pending: 'AKTIV',
    },
};

export const PendingAvmeldtRequest: Story = {
    args: {
        sprak: 'nb',
        onSubmit(val) {
            console.log('onSubmit', val);
            return Promise.resolve();
        },
        pending: 'OPT_OUT',
    },
};

export const MedFeilmelding: Story = {
    args: {
        sprak: 'nb',
        onSubmit(val) {
            console.log('onSubmit', val);
            return Promise.resolve();
        },
        error: 'feil',
    },
};
