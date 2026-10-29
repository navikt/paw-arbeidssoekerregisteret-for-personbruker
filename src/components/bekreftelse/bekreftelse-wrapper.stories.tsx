import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HttpResponse, http } from 'msw';
import { expect, userEvent } from 'storybook/test';
import BekreftelseWrapper from './bekreftelse-wrapper';

const bekreftelseApi = `${process.env.NEXT_PUBLIC_BASE_PATH}/api/bekreftelse`;

const meta = {
    title: 'Bekreftelse/Bekreftelse wrapper',
    component: BekreftelseWrapper,
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
        ],
        registrerArbeidssokerUrl: 'https://www.nav.no/arbeid',
    },
    parameters: {
        nextjs: {
            appDirectory: true,
        },
        msw: {
            handlers: [http.post(bekreftelseApi, () => HttpResponse.json({}, { status: 202 }))],
        },
    },
} satisfies Meta<typeof BekreftelseWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bokmal: Story = {
    play: async ({ canvas }) => {
        const jaSvar = await canvas.findAllByRole('radio', { name: 'Ja' });
        await userEvent.click(jaSvar[0]);
        await userEvent.click(jaSvar[1]);
        await userEvent.click(await canvas.findByRole('button', { name: 'Send inn' }));
        await expect(
            await canvas.findByText('Du har bekreftet at du fortsatt vil være registrert som arbeidssøker'),
        ).toBeInTheDocument();
    },
};

export const Nynorsk: Story = {
    args: {
        sprak: 'nn',
    },
};

export const English: Story = {
    args: {
        sprak: 'en',
    },
};

export const Nettverksfeil: Story = {
    parameters: {
        msw: {
            handlers: [http.post(bekreftelseApi, () => HttpResponse.error())],
        },
    },
    play: async ({ canvas }) => {
        const jaSvar = await canvas.findAllByRole('radio', { name: 'Ja' });
        await userEvent.click(jaSvar[0]);
        await userEvent.click(jaSvar[1]);
        await userEvent.click(await canvas.findByRole('button', { name: 'Send inn' }));
        await expect(
            await canvas.findByText('Noe gikk dessverre galt. Forsøk igjen, eller kontakt NAV.'),
        ).toBeVisible();
    },
};
