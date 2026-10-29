import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent } from 'storybook/test';
import Paginering from '@/components/styrkloft/paginering';

const meta = {
    title: 'Styrkløft/Komponenter/Paginering',
    component: Paginering,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof Paginering>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        antallSider: 2,
        aktivSide: 1,
        onClick: fn(),
    },
};

export const AktivSide2: Story = {
    args: {
        antallSider: 3,
        aktivSide: 2,
        onClick: fn(),
    },
};

export const SisteSide: Story = {
    args: {
        antallSider: 3,
        aktivSide: 3,
        onClick: fn(),
    },
};

export const GaaTilNesteSide: Story = {
    args: {
        antallSider: 3,
        aktivSide: 1,
        onClick: fn(),
    },
    play: async ({ args, canvas }) => {
        await userEvent.click(await canvas.findByRole('button', { name: 'Neste side' }));
        await expect(args.onClick).toHaveBeenCalledWith(2);
    },
};
