import type { Meta, StoryObj } from '@storybook/nextjs';
import GodkjennEksperimentStatic from '@/components/styrkløft/godkjenn-eksperiment-static';

const meta = {
    title: 'Styrkløft/Godkjenn eksperiment/Static',
    component: GodkjennEksperimentStatic,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof GodkjennEksperimentStatic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        sprak: 'nb',
        visFeilmelding: false,
        visAvmeldtLoader: false,
        visGodkjennLoader: false,
        onGodkjennSubmit: () => Promise.resolve(),
        onAvmeldSubmit: () => Promise.resolve(),
    },
};

export const PendingGodkjentRequest: Story = {
    args: {
        sprak: 'nb',
        visGodkjennLoader: true,
        visAvmeldtLoader: false,
        visFeilmelding: false,
        onGodkjennSubmit: () => Promise.resolve(),
        onAvmeldSubmit: () => Promise.resolve(),
    },
};

export const PendingAvmeldtRequest: Story = {
    args: {
        sprak: 'nb',
        visGodkjennLoader: false,
        visAvmeldtLoader: true,
        visFeilmelding: false,
        onGodkjennSubmit: () => Promise.resolve(),
        onAvmeldSubmit: () => Promise.resolve(),
    },
};

export const MedFeilmeldingt: Story = {
    args: {
        sprak: 'nb',
        visGodkjennLoader: false,
        visAvmeldtLoader: false,
        visFeilmelding: true,
        onGodkjennSubmit: () => Promise.resolve(),
        onAvmeldSubmit: () => Promise.resolve(),
    },
};
