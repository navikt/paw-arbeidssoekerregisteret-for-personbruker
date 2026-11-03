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
    play: async ({ args, canvas }) => {
        const side1 = await canvas.findByRole('button', { name: 'Side 1' });
        await expect(side1).toHaveAttribute('aria-current', 'page');

        await userEvent.tab();
        await userEvent.tab();
        await expect(side1).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        await expect(args.onClick).toHaveBeenCalledWith(1);
    },
};

export const Nynorsk: Story = {
    args: {
        antallSider: 2,
        aktivSide: 1,
        onClick: fn(),
        sprak: 'nn',
    },
    play: async ({ args, canvas }) => {
        const side1 = await canvas.findByRole('button', { name: 'Side 1' });
        await expect(side1).toHaveAttribute('aria-current', 'page');

        await userEvent.tab();
        await userEvent.tab();
        await expect(side1).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        await expect(args.onClick).toHaveBeenCalledWith(1);
    },
};

export const English: Story = {
    args: {
        antallSider: 2,
        aktivSide: 1,
        onClick: fn(),
        sprak: 'en',
    },
    play: async ({ args, canvas }) => {
        const page1 = await canvas.findByRole('button', { name: 'Page 1' });
        await expect(page1).toHaveAttribute('aria-current', 'page');

        await userEvent.tab();
        await userEvent.tab();
        await expect(page1).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        await expect(args.onClick).toHaveBeenCalledWith(1);
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
    play: async ({ args, canvas }) => {
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.tab();
        const nesteSide = await canvas.findByRole('button', { name: 'Neste side' });
        await expect(nesteSide).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        await expect(args.onClick).toHaveBeenCalledWith(3);
    },
};

export const ForrigePaaForsteSide: Story = {
    args: {
        antallSider: 3,
        aktivSide: 1,
        onClick: fn(),
    },
    play: async ({ args, canvas }) => {
        await userEvent.tab();
        const forrigeSide = await canvas.findByRole('button', { name: 'Forrige side' });
        await expect(forrigeSide).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        await expect(args.onClick).toHaveBeenCalledWith(1);
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
