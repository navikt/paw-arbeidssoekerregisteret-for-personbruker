import type { Meta, StoryObj } from '@storybook/nextjs';
import { BekreftelseBesvart } from './bekreftelse-besvart';

const meta = {
    title: 'Bekreftelse/Komponenter/Bekreftelse besvart',
    component: BekreftelseBesvart,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof BekreftelseBesvart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BekreftelseBesvartStory: Story = {
    args: {
        besvarelse: {
            svar: {
                sendtInnAv: {
                    tidspunkt: '2024-10-23T13:44:28.485Z'
                },
                harJobbetIDennePerioden: false,
                vilFortsetteSomArbeidssoeker: true,
                gjelderFra: '2024-10-01T13:44:28.485Z',
                gjelderTil: '2024-10-14T13:44:28.485Z'
            },
        } as any,
        sprak: 'nb',
        registrerArbeidssokerUrl: process.env.REGISTRER_ARBEIDSSOKER_URL!
    },
};

export const BekreftelseUtmeldtStory: Story = {
    args: {
        besvarelse: {
            svar: {
                sendtInnAv: {
                    tidspunkt: '2024-10-23T13:44:28.485Z'
                },
                harJobbetIDennePerioden: true,
                vilFortsetteSomArbeidssoeker: false,
                gjelderFra: '2024-10-01T13:44:28.485Z',
                gjelderTil: '2024-10-14T13:44:28.485Z'
            },
        } as any,
        sprak: 'nb',
        registrerArbeidssokerUrl: process.env.REGISTRER_ARBEIDSSOKER_URL!
    },
};
