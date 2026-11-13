import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { KvitteringAvmeldt } from '@/components/styrkloft/kvittering-avmeldt';

const meta = {
    title: 'Styrkløft/Komponenter/Kvittering avmeldt',
    component: KvitteringAvmeldt,
    tags: ['autodocs'],
    args: {
        sprak: 'nb',
    },
} satisfies Meta<typeof KvitteringAvmeldt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultKvittering: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole('heading', { name: 'Valget ditt er registrert', level: 3 })).toBeInTheDocument();
        await expect(canvas.getByText('Vi vil ikke vise deg forslag på ledige stillinger')).toBeInTheDocument();
    },
};

export const KvitteringBokmål: Story = {
    args: {
        sprak: 'nb',
    },
};

export const KvitteringNynorsk: Story = {
    args: {
        sprak: 'nn',
    },
};

export const KvitteringEngelsk: Story = {
    args: {
        sprak: 'en',
    },
};
