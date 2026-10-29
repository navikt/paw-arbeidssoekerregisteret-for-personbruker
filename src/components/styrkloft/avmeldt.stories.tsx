import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent } from 'storybook/test';
import AvmeldtStateless from '@/components/styrkloft/avmeldt-stateless';

const meta = {
    title: 'Styrkløft/Komponenter/Avmeldt',
    component: AvmeldtStateless,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof AvmeldtStateless>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onSubmit: fn(),
        sprak: 'nb',
        errorTjenestestatus: null,
        pendingTjenestestatus: null,
        submittedTjenestestatus: null,
    },
    async play({ canvas, args }) {
        await userEvent.click(canvas.getByRole('button'));
        await expect(args.onSubmit).toHaveBeenCalledOnce();
    },
};

export const NormalBokmal: Story = {
    ...Default,
    args: {
        ...Default.args,
        sprak: 'nb',
    },
};

export const NormalNynorsk: Story = {
    ...Default,
    args: {
        ...Default.args,
        sprak: 'nn',
    },
};

export const NormalEngelsk: Story = {
    ...Default,
    args: {
        ...Default.args,
        sprak: 'en',
    },
};
