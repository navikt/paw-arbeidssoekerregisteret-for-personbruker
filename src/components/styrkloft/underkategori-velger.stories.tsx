import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect, screen, userEvent, within } from 'storybook/test';
import UnderkategoriVelger from '@/components/styrkloft/underkategori-velger';
import { byggYrkeskoderTilStyrkMap } from '@/lib/bygg-yrkeskoder-med-styrk-map';

const options = byggYrkeskoderTilStyrkMap();
const firstCategory = options[0];
const partlySelected = firstCategory.underKategorier.slice(0, 1).map(({ navn }) => navn);
const fullySelected = firstCategory.underKategorier.map(({ navn }) => navn);

const meta = {
    title: 'Styrkløft/Komponenter/UnderkategoriVelger',
    component: UnderkategoriVelger,
    tags: ['autodocs'],
    args: {},
    render: function Render(args) {
        const [values, setValues] = useState(args.values);
        return (
            <UnderkategoriVelger
                values={values}
                options={args.options}
                triggerText={args.triggerText}
                onChange={setValues}
                sprak={args.sprak}
                showError={args.showError}
                errorMessage={args.errorMessage}
            />
        );
    },
} satisfies Meta<typeof UnderkategoriVelger>;

export default meta;
type Story = StoryObj<typeof meta>;

async function assertNoHorizontalOverflow(canvasElement: HTMLElement) {
    const document = canvasElement.ownerDocument;
    await expect([320, 1280]).toContain(document.defaultView?.innerWidth);
    await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(document.documentElement.clientWidth);
}

export const Default: Story = {
    args: {
        options,
        values: [],
        triggerText: 'Velg kategori',
        onChange(values: string[]) {
            console.log('onChange', values);
        },
        sprak: 'nb',
        showError: false,
        errorMessage: 'må fylles ut',
    },
};

export const MedFeil: Story = {
    args: {
        options,
        values: [],
        triggerText: 'Velg kategori',
        onChange(values: string[]) {
            console.log('onChange', values);
        },
        sprak: 'nb',
        showError: true,
        errorMessage: 'må fylles ut',
    },
};

export const DelvisValgt: Story = {
    args: {
        options,
        values: partlySelected,
        triggerText: 'Velg kategori',
        onChange: console.log,
        sprak: 'nb',
        showError: false,
        errorMessage: 'må fylles ut',
    },
    play: async ({ canvasElement }) => {
        await assertNoHorizontalOverflow(canvasElement);
    },
};

export const FulltValgt: Story = {
    args: {
        options,
        values: fullySelected,
        triggerText: 'Velg kategori',
        onChange: console.log,
        sprak: 'nb',
        showError: false,
        errorMessage: 'må fylles ut',
    },
    play: async ({ canvas, canvasElement }) => {
        await assertNoHorizontalOverflow(canvasElement);
        const chip = canvas.getByRole('button', { name: new RegExp(firstCategory.navn) });
        await userEvent.tab();
        await expect(canvas.getByRole('button', { name: 'Velg kategori' })).toHaveFocus();
        await userEvent.tab();
        await expect(chip).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        await expect(canvas.queryByRole('button', { name: new RegExp(firstCategory.navn) })).not.toBeInTheDocument();
    },
};

export const UnderkategoriApenViaTastatur: Story = {
    ...Default,
    play: async ({ canvas }) => {
        const trigger = canvas.getByRole('button', { name: 'Velg kategori' });
        await userEvent.tab();
        await expect(trigger).toHaveFocus();
        await userEvent.keyboard('{Enter}');

        const menu = await screen.findByRole('menu');
        const category = within(menu).getByRole('menuitemcheckbox', { name: new RegExp(firstCategory.navn) });
        await userEvent.keyboard('{ArrowDown}');
        await expect(category).toHaveFocus();
        await userEvent.keyboard('{Enter}');

        await expect(
            within(menu).getByRole('menuitemcheckbox', {
                name: new RegExp(firstCategory.underKategorier[0].navn),
            }),
        ).toBeVisible();
    },
};

export const EscapeGirFokusTilbakeViaTastatur: Story = {
    ...Default,
    play: async ({ canvas }) => {
        const trigger = canvas.getByRole('button', { name: 'Velg kategori' });
        await userEvent.tab();
        await expect(trigger).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        await expect(await screen.findByRole('menu')).toBeVisible();
        await userEvent.keyboard('{Escape}');
        await expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        await expect(trigger).toHaveFocus();
    },
};
