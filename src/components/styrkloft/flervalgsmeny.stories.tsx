import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, screen, userEvent, within } from 'storybook/test';
import { FlerValgsMeny } from './flervalgsmeny';

const meta = {
    title: 'Styrkløft/Komponenter/Flervalgsmeny',
    component: FlerValgsMeny,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof FlerValgsMeny>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultFlerValgsMeny: Story = {
    args: {
        onEditSearch: () => console.log('onEditSearch'),
        onEnd: () => console.log('onEndSearch'),
        disabledEditSearch: false,
        sprak: 'nb',
    },
};

export const ApenViaTastatur: Story = {
    ...DefaultFlerValgsMeny,
    play: async ({ canvas }) => {
        const trigger = canvas.getByRole('button', { name: 'Valg for arbeidsøket' });
        await userEvent.tab();
        await expect(trigger).toHaveFocus();
        await userEvent.keyboard('{Enter}');

        const menu = await screen.findByRole('menu');
        await expect(within(menu).getByRole('menuitem', { name: 'Endre søket mitt' })).toBeVisible();
        await expect(within(menu).getByRole('menuitem', { name: /Jeg ønsker ikke lengre/ })).toBeVisible();
    },
};

export const EscapeGirFokusTilbakeViaTastatur: Story = {
    ...DefaultFlerValgsMeny,
    play: async ({ canvas }) => {
        const trigger = canvas.getByRole('button', { name: 'Valg for arbeidsøket' });
        await userEvent.tab();
        await expect(trigger).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        await expect(await screen.findByRole('menu')).toBeVisible();
        await userEvent.keyboard('{Escape}');
        await expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        await expect(trigger).toHaveFocus();
    },
};
