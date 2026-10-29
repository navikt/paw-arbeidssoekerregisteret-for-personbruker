import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent } from 'storybook/test';
import type { BekreftelseSkjemaType } from '@/model/bekreftelse';
import { BekreftelseSkjema } from './bekreftelse-skjema';

const meta = {
    title: 'Bekreftelse/Komponenter/Bekreftelse skjema',
    component: BekreftelseSkjema,
    tags: ['autodocs'],
    args: {
        sprak: 'nb',
        fristDato: '2024-09-09',
        bekreftelse: {
            bekreftelseId: '42',
            gjelderFra: '2024-08-24',
            gjelderTil: '2024-09-03',
            periodeId: '24',
        },
        onCancel: fn(),
        onSubmit: async (_data: BekreftelseSkjemaType): Promise<void> => {},
    },
} satisfies Meta<typeof BekreftelseSkjema>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BekreftelseSkjemaStory: Story = {
    play: async ({ canvas }) => {
        await expect(
            await canvas.findByRole('heading', { name: 'Bekreft at du vil være registrert som arbeidssøker' }),
        ).toBeVisible();
    },
};

export const BekreftelseSkjemaBokmal: Story = {
    args: { sprak: 'nb' },
    play: async ({ canvas }) => {
        await expect(
            await canvas.findByRole('heading', { name: 'Bekreft at du vil være registrert som arbeidssøker' }),
        ).toBeVisible();
    },
};

export const BekreftelseSkjemaNynorsk: Story = {
    args: { sprak: 'nn' },
    play: async ({ canvas }) => {
        await expect(
            await canvas.findByRole('heading', { name: 'Stadfest at du ønskjer å vere registrert som arbeidssøkjar' }),
        ).toBeVisible();
    },
};

export const BekreftelseSkjemaEngelsk: Story = {
    args: { sprak: 'en' },
    play: async ({ canvas }) => {
        await expect(
            await canvas.findByRole('heading', { name: 'Confirm that you want to stay registered as a jobseekerr' }),
        ).toBeVisible();
    },
};

export const ViserFeilmelding: Story = {
    play: async (context) => {
        const canvas = context.canvas;
        await userEvent.click((await canvas.findAllByText('Ja'))[0]);
        await userEvent.click(await canvas.findByText('Send inn'));
        await expect(await canvas.findByText('Du må svare før du kan sende inn')).toBeDefined();
    },
};
export const FeilVedSubmit: Story = {
    args: {
        sprak: 'nb',
        fristDato: '2024-09-09',
        bekreftelse: {
            bekreftelseId: '42',
            gjelderFra: '2024-08-24',
            gjelderTil: '2024-09-03',
            periodeId: '24',
        },
        onCancel: fn(),
        onSubmit: async (_data: BekreftelseSkjemaType) => {
            throw new Error('Network request failed');
        },
    },
    play: async (context) => {
        const canvas = context.canvas;
        await userEvent.click((await canvas.findAllByText('Ja'))[0]);
        await userEvent.click((await canvas.findAllByText('Ja'))[1]);
        await userEvent.click(await canvas.findByText('Send inn'));
        await expect(
            await canvas.findByText('Noe gikk dessverre galt. Forsøk igjen, eller kontakt NAV.'),
        ).toBeVisible();
    },
};

export const AvbrytSkjema: Story = {
    args: { onCancel: fn() },
    play: async ({ canvas, args }) => {
        await userEvent.click(await canvas.findByRole('button', { name: 'Avbryt' }));
        await expect(args.onCancel).toHaveBeenCalledTimes(1);
    },
};

export const AvbrytUtmelding: Story = {
    play: async ({ canvas }) => {
        await userEvent.click((await canvas.findAllByText('Nei'))[0]);
        await userEvent.click((await canvas.findAllByText('Nei'))[1]);
        await userEvent.click(await canvas.findByText('Send inn'));
        await userEvent.click(await canvas.findByText('Avbryt og gå tilbake'));

        await expect(
            await canvas.findByRole('heading', { name: 'Bekreft at du vil være registrert som arbeidssøker' }),
        ).toBeVisible();
    },
};

export const InnsendingVenter: Story = {
    args: {
        onSubmit: () => new Promise<void>(() => {}),
    },
    play: async ({ canvas }) => {
        await userEvent.click((await canvas.findAllByText('Ja'))[0]);
        await userEvent.click((await canvas.findAllByText('Ja'))[1]);
        const sendInnKnapp = await canvas.findByRole('button', { name: 'Send inn' });
        await userEvent.click(sendInnKnapp);

        await expect(sendInnKnapp).toBeDisabled();
    },
};
