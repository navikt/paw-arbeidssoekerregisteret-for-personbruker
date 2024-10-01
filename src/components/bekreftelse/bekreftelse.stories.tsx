import type { Meta, StoryObj } from '@storybook/react';
import { Bekreftelse } from './bekreftelse';
import { BekreftelseType } from '../../../types/bekreftelse';

const meta = {
    title: 'Bekreftelse',
    component: Bekreftelse,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof Bekreftelse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BekreftelseStory: Story = {
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
        onSubmit(data: BekreftelseType): Promise<void> {
            console.log('onSubmit', data);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });
        },
    },
};
