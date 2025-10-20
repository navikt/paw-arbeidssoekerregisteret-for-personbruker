import type { Meta, StoryObj } from '@storybook/nextjs';
import { StartStyrkloftStatic } from '@/components/styrkløft/start-styrkloft-static';

const meta = {
    title: 'Styrkløft/StartStyrkløftStatic',
    component: StartStyrkloftStatic,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof StartStyrkloftStatic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Start: Story = {
    args: {
        onSubmit(): Promise<void> {
            return Promise.resolve();
        },
        sprak: 'nb',
        visGodkjennEksperiment: true,
        visVelgFiltere: false,
        visAvmeldtKvittering: false,
    },
};

export const ValgtVisStillinger: Story = {
    args: {
        onSubmit(): Promise<void> {
            return Promise.resolve();
        },
        sprak: 'nb',
        visGodkjennEksperiment: false,
        visVelgFiltere: true,
        visAvmeldtKvittering: false,
    },
}

export const ValgtNeiTakk: Story = {
    args: {
        onSubmit(): Promise<void> {
            return Promise.resolve();
        },
        sprak: 'nb',
        visGodkjennEksperiment: false,
        visVelgFiltere: false,
        visAvmeldtKvittering: true,
    },
}
