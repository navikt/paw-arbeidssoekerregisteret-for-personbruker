import type { Meta, StoryObj } from '@storybook/react';
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
        periode: '21. mars - 6. april',
        innsendtDato: '06.03',
        nesteDato: '20.04',
        besvarelse: {
            harJobbetIDennePerioden: true,
            vilFortsetteSomArbeidssoeker: true,
            dato: '',
        },
        sprak: 'nb',
    },
};

export const BekreftelseUtmeldtStory: Story = {
    args: {
        periode: '21. mars - 6. april',
        innsendtDato: '06.03',
        nesteDato: '20.04',
        besvarelse: {
            harJobbetIDennePerioden: true,
            vilFortsetteSomArbeidssoeker: false,
            dato: '',
        },
        sprak: 'nb',
    },
};
