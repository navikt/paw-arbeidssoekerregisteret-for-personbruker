import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
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
                    tidspunkt: '2024-10-23T13:44:28.485Z',
                },
                harJobbetIDennePerioden: false,
                vilFortsetteSomArbeidssoeker: true,
                gjelderFra: '2024-10-01T13:44:28.485Z',
                gjelderTil: '2024-10-14T13:44:28.485Z',
            },
        } as any,
        sprak: 'nb',
        registrerArbeidssokerUrl: 'https://www.nav.no/arbeid/arbeidssoker',
    },
};

export const BekreftelseUtmeldtStory: Story = {
    args: {
        besvarelse: {
            svar: {
                sendtInnAv: {
                    tidspunkt: '2024-10-23T13:44:28.485Z',
                },
                harJobbetIDennePerioden: true,
                vilFortsetteSomArbeidssoeker: false,
                gjelderFra: '2024-10-01T13:44:28.485Z',
                gjelderTil: '2024-10-14T13:44:28.485Z',
            },
        } as any,
        sprak: 'nb',
        registrerArbeidssokerUrl: 'https://www.nav.no/arbeid/arbeidssoker',
    },
};

const lagBekreftelse = () =>
    ({
        svar: {
            sendtInnAv: { tidspunkt: '2024-10-23T13:44:28.485Z' },
            harJobbetIDennePerioden: false,
            vilFortsetteSomArbeidssoeker: true,
            gjelderFra: '2024-10-01T13:44:28.485Z',
            gjelderTil: '2024-10-14T13:44:28.485Z',
        },
    }) as any;

const registrerArbeidssokerUrl = 'https://www.nav.no/arbeid/arbeidssoker';

export const BekreftelseBesvartBokmal: Story = {
    args: { besvarelse: lagBekreftelse(), sprak: 'nb', registrerArbeidssokerUrl },
    play: async ({ canvas }) => {
        await expect(
            await canvas.findByRole('heading', {
                name: 'Du har bekreftet at du fortsatt ønsker å være registrert som arbeidssøker',
            }),
        ).toBeVisible();
    },
};

export const BekreftelseBesvartNynorsk: Story = {
    args: { besvarelse: lagBekreftelse(), sprak: 'nn', registrerArbeidssokerUrl },
    play: async ({ canvas }) => {
        await expect(
            await canvas.findByRole('heading', {
                name: 'Du har stadfesta at du fortsatt ønskjer å være registrert som arbeidssøkjar',
            }),
        ).toBeVisible();
    },
};

export const BekreftelseBesvartEngelsk: Story = {
    args: { besvarelse: lagBekreftelse(), sprak: 'en', registrerArbeidssokerUrl },
    play: async ({ canvas }) => {
        await expect(
            await canvas.findByRole('heading', {
                name: 'You have confirmed that you still want to be registered as a jobseeker',
            }),
        ).toBeVisible();
    },
};
