import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect, screen, userEvent } from 'storybook/test';
import FilterVelger from '@/components/styrkloft/filter-velger';

const options = ['Baker', 'Kokk', 'Snekker', 'Rikskjendis', 'Riksmeglingsmann', 'Riksklyse', 'Fotballdommer'];

const meta = {
    title: 'Styrkløft/Komponenter/FilterVelger',
    component: FilterVelger,
    tags: ['autodocs'],
    args: {},
    render: function Render(args) {
        const [values, setValues] = useState(args.values);
        return <FilterVelger {...args} values={values} onChange={setValues} />;
    },
} satisfies Meta<typeof FilterVelger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IkkeValgt: Story = {
    args: {
        values: [],
        options,
        heading: 'Velg kategori',
        onChange: console.log,
    },
    play: async ({ canvas }) => {
        await userEvent.click(await canvas.findByRole('button', { name: /^Velg kategori\b/ }));
        await userEvent.click(await canvas.findByRole('button', { name: 'Kokk' }));
        const valgtKategori = await canvas.findByRole('button', { name: /^Kokk\s/ });
        await expect(valgtKategori).toBeVisible();
        await userEvent.click(valgtKategori);
        await expect(canvas.queryByRole('button', { name: /^Kokk\s/ })).not.toBeInTheDocument();
    },
};

export const MedVerdi: Story = {
    args: {
        values: ['Kokk', 'Snekker'],
        options,
        heading: 'Velg kategori',
        onChange: console.log,
    },
};

export const Apen: Story = {
    args: {
        values: [],
        options,
        heading: 'Velg kategori',
        defaultOpen: true,
        onChange: console.log,
    },
    play: async ({ canvas }) => {
        await expect(await canvas.findByRole('button', { name: 'Kokk' })).toBeVisible();
    },
};

export const Bokmal: Story = {
    args: {
        values: [],
        options,
        heading: 'Velg kategori',
        onChange: console.log,
    },
};

export const Nynorsk: Story = {
    args: {
        values: [],
        options: ['Bakare', 'Kokk', 'Snikkar', 'Rikskjendis'],
        heading: 'Vel kategori',
        onChange: console.log,
    },
};

export const Engelsk: Story = {
    args: {
        values: [],
        options: ['Baker', 'Chef', 'Carpenter', 'Celebrity'],
        heading: 'Select category',
        onChange: console.log,
    },
};

export const ApenViaTastatur: Story = {
    args: {
        values: [],
        options,
        heading: 'Velg kategori',
        onChange: console.log,
    },
    play: async ({ canvas }) => {
        const trigger = canvas.getByRole('button', { name: /^Velg kategori/ });
        await userEvent.tab();
        await expect(trigger).toHaveFocus();
        await userEvent.keyboard('{Enter}');

        await expect(await screen.findByRole('button', { name: 'Baker' })).toBeVisible();
        await expect(screen.getByRole('button', { name: 'Kokk' })).toBeVisible();
    },
};

export const EscapeGirFokusTilbakeViaTastatur: Story = {
    args: {
        values: [],
        options,
        heading: 'Velg kategori',
        onChange: console.log,
    },
    play: async ({ canvas }) => {
        const trigger = canvas.getByRole('button', { name: /^Velg kategori/ });
        await userEvent.tab();
        await expect(trigger).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        await expect(trigger).toHaveAttribute('aria-expanded', 'true');
        await userEvent.keyboard('{Escape}');
        await expect(trigger).toHaveAttribute('aria-expanded', 'false');
        await expect(trigger).toHaveFocus();
    },
};
