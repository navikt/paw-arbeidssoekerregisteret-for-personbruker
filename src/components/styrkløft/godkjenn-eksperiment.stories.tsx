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
        }
    }
}
