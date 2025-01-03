import type { Meta, StoryObj } from '@storybook/react';
import { BekreftelseSkjema } from './bekreftelse-skjema';
import { BekreftelseSkjemaType } from '../../../types/bekreftelse';
import { userEvent, expect } from '@storybook/test';

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
        onCancel() {
            console.log('onCancel');
        },
        onSubmit(data) {
            console.log('onSubmit', data);
            return Promise.resolve();
        },
    },
} satisfies Meta<typeof BekreftelseSkjema>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BekreftelseSkjemaStory: Story = {
    play: (context) => {},
};

export const ViserFeilmelding: Story = {
    play: async (context) => {
        const canvas = context.canvas;
        await userEvent.click((await canvas.findAllByText('Ja'))[0]);
        await userEvent.click(await canvas.findByText('Send inn'));
        await expect(await  canvas.findByText('Du må svare før du kan sende inn')).toBeInTheDOM()
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
        onCancel() {
            console.log('onCancel');
        },
        onSubmit(data: BekreftelseSkjemaType): Promise<void> {
            console.log('onSubmit', data);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(new Error('500 Internal Server Error'));
                }, 1000);
            });
        },
    },
    play: async (context) => {
        const canvas = context.canvas;
        await userEvent.click((await canvas.findAllByText('Ja'))[0]);
        await userEvent.click((await canvas.findAllByText('Ja'))[1]);
        await userEvent.click(await canvas.findByText('Send inn'));
        await expect(
            await canvas.findByText('Noe gikk dessverre galt. Forsøk igjen, eller kontakt NAV.'),
        ).toBeInTheDOM();
    }
};
