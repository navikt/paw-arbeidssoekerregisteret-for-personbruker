import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent } from 'storybook/test';
import { Bekreftelse } from './bekreftelse';

const meta = {
    title: 'Bekreftelse',
    component: Bekreftelse,
    tags: ['autodocs'],
    args: {
        sprak: 'nb',
        erAktivArbeidssoker: true,
        sistInnsendteBekreftelse: undefined,
        tilgjengeligeBekreftelser: [
            {
                gjelderFra: '2024-08-01',
                gjelderTil: '2024-08-15',
                bekreftelseId: '42',
                periodeId: '1',
            },
            {
                gjelderFra: '2024-07-15',
                gjelderTil: '2024-07-31',
                bekreftelseId: '41',
                periodeId: '2',
            },
        ],
        registrerArbeidssokerUrl: 'https://www.nav.no/arbeid/arbeidssoker',
        onSubmit: async () => {},
    },
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
} satisfies Meta<typeof Bekreftelse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BekreftelseDemo: Story = {};

export const BekreftelseBokmal: Story = {
    args: { sprak: 'nb' },
    play: async ({ canvas }) => {
        await expect(
            await canvas.findByRole('heading', { name: 'Bekreft at du vil være registrert som arbeidssøker' }),
        ).toBeVisible();
    },
};

export const BekreftelseNynorsk: Story = {
    args: { sprak: 'nn' },
    play: async ({ canvas }) => {
        await expect(
            await canvas.findByRole('heading', { name: 'Stadfest at du ønskjer å vere registrert som arbeidssøkjar' }),
        ).toBeVisible();
    },
};

export const BekreftelseEngelsk: Story = {
    args: { sprak: 'en' },
    play: async ({ canvas }) => {
        await expect(
            await canvas.findByRole('heading', { name: 'Confirm that you want to stay registered as a jobseekerr' }),
        ).toBeVisible();
    },
};

export const BekreftArbeidssokerStatus: Story = {
    play: async ({ canvas }) => {
        await userEvent.click((await canvas.findAllByText('Nei'))[0]);
        await userEvent.click((await canvas.findAllByText('Ja'))[1]);
        await userEvent.click(await canvas.findByText('Send inn'));
        await expect(
            await canvas.findByText('Du har bekreftet at du fortsatt vil være registrert som arbeidssøker'),
        ).toBeDefined();
    },
};

export const AvsluttArbeidssokerStatus: Story = {
    play: async ({ canvas }) => {
        await userEvent.click((await canvas.findAllByText('Nei'))[0]);
        await userEvent.click((await canvas.findAllByText('Nei'))[1]);
        await userEvent.click(await canvas.findByText('Send inn'));
        await userEvent.click(await canvas.findByText('Jeg vil ikke være registrert som arbeidssøker'));

        await expect(await canvas.findByText('Du er ikke lenger registrert som arbeidssøker')).toBeDefined();
    },
};

export const IngenTilgjengelige: Story = {
    args: {
        sprak: 'nb',
        erAktivArbeidssoker: true,
        sistInnsendteBekreftelse: undefined,
        tilgjengeligeBekreftelser: [],
        registrerArbeidssokerUrl: 'https://www.nav.no/arbeid/arbeidssoker',
        onSubmit: async () => {},
    },
};

export const IkkeAktivArbeidssoker: Story = {
    args: { erAktivArbeidssoker: false },
    play: async ({ canvas }) => {
        await expect(
            await canvas.findByRole('heading', { name: 'Du er ikke registert som aktiv arbeidssøker' }),
        ).toBeVisible();
    },
};

export const BekreftNestePeriode: Story = {
    play: async ({ canvas }) => {
        await userEvent.click((await canvas.findAllByText('Nei'))[0]);
        await userEvent.click((await canvas.findAllByText('Ja'))[1]);
        await userEvent.click(await canvas.findByText('Send inn'));
        await userEvent.click(await canvas.findByText('Bekreft neste periode'));

        await expect(await canvas.findByRole('button', { name: 'Send inn' })).toBeVisible();
        await expect(
            await canvas.findByRole('heading', { name: 'Bekreft at du vil være registrert som arbeidssøker' }),
        ).toBeVisible();
    },
};

export const NettverksfeilVedInnsending: Story = {
    args: {
        onSubmit: async () => {
            throw new Error('Network request failed');
        },
    },
    play: async ({ canvas }) => {
        await userEvent.click((await canvas.findAllByText('Ja'))[0]);
        await userEvent.click((await canvas.findAllByText('Ja'))[1]);
        await userEvent.click(await canvas.findByText('Send inn'));

        await expect(
            await canvas.findByText('Noe gikk dessverre galt. Forsøk igjen, eller kontakt NAV.'),
        ).toBeVisible();
    },
};
