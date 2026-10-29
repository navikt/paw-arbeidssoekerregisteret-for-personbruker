import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { TilgjengeligBekreftelseLink } from '@/components/bekreftelse/tilgjengelig-bekreftelse-link';

const meta = {
    title: 'Bekreftelse/Komponenter/TilgjengeligBekreftelseLink',
    component: TilgjengeligBekreftelseLink,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof TilgjengeligBekreftelseLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IngenTilgjengeligeBekreftelser: Story = {
    args: {
        tilgjengeligeBekreftelser: [],
        sprak: 'nb',
    },
    play: async ({ canvas }) => {
        await expect(canvas.queryByRole('link')).not.toBeInTheDocument();
    },
};

export const TilgjengeligeBekreftelser: Story = {
    args: {
        tilgjengeligeBekreftelser: [
            {
                gjelderFra: '2024-08-01',
                gjelderTil: '2024-08-15',
                bekreftelseId: '42',
                periodeId: '1',
            },
        ],
        sprak: 'nb',
    },
    play: async ({ canvas }) => {
        await expect(
            await canvas.findByRole('link', {
                name: 'Bekreft at du vil være registrert som arbeidssøker hos Nav',
            }),
        ).toBeVisible();
    },
};

const tilgjengeligeBekreftelser = [
    {
        gjelderFra: '2024-08-01',
        gjelderTil: '2024-08-15',
        bekreftelseId: '42',
        periodeId: '1',
    },
];

export const TilgjengeligBekreftelseBokmal: Story = {
    args: { tilgjengeligeBekreftelser, sprak: 'nb' },
    play: async ({ canvas }) => {
        await expect(
            await canvas.findByRole('link', { name: 'Bekreft at du vil være registrert som arbeidssøker hos Nav' }),
        ).toBeVisible();
    },
};

export const TilgjengeligBekreftelseNynorsk: Story = {
    args: { tilgjengeligeBekreftelser, sprak: 'nn' },
    play: async ({ canvas }) => {
        await expect(
            await canvas.findByRole('link', { name: 'Stadfest at du vil vera registrert som arbeidssøkjar hos Nav' }),
        ).toBeVisible();
    },
};

export const TilgjengeligBekreftelseEngelsk: Story = {
    args: { tilgjengeligeBekreftelser, sprak: 'en' },
    play: async ({ canvas }) => {
        await expect(
            await canvas.findByRole('link', { name: 'Confirm that you want to be registered as a jobseeker with Nav' }),
        ).toBeVisible();
    },
};
