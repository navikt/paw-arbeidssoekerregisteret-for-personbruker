import type { Meta, StoryObj } from '@storybook/nextjs';
import { Bekreftelse } from './bekreftelse';
import { userEvent, expect } from 'storybook/test';
import { BekreftelseSkjemaType } from '@/model/bekreftelse';

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
        registrerArbeidssokerUrl: process.env.REGISTRER_ARBEIDSSOKER_URL!,
        onSubmit(data: BekreftelseSkjemaType): Promise<void> {
            console.log('onSubmit', data);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });
        },
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
        registrerArbeidssokerUrl: process.env.REGISTRER_ARBEIDSSOKER_URL!,
        onSubmit(data: BekreftelseSkjemaType): Promise<void> {
            console.log('onSubmit', data);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });
        },
    },
};
