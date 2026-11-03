import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
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
            await canvas.findByRole('heading', { name: 'Confirm that you want to stay registered as a jobseeker' }),
        ).toBeVisible();
    },
};

export const ViserFeilmelding: Story = {
    play: async (context) => {
        const canvas = context.canvas;
        await userEvent.click((await canvas.findAllByText('Ja'))[0]);
        await userEvent.click(await canvas.findByText('Send inn'));
        const gruppe = canvas.getByRole('radiogroup', { name: 'Vil du fortsatt være registrert som arbeidssøker?' });
        await expect(
            within(gruppe).getByRole('radio', { name: 'Ja', description: 'Du må svare før du kan sende inn' }),
        ).toBeVisible();
    },
};

export const Tastaturnavigasjon: Story = {
    play: async ({ canvas }) => {
        const arbeid = canvas.getByRole('radiogroup', { name: /Har du vært i arbeid i perioden/ });
        await userEvent.tab();
        await expect(within(arbeid).getByRole('radio', { name: 'Ja' })).toHaveFocus();

        await userEvent.keyboard('{ArrowDown}');
        await expect(within(arbeid).getByRole('radio', { name: 'Nei' })).toBeChecked();
        await userEvent.tab();

        const fortsette = canvas.getByRole('radiogroup', { name: 'Vil du fortsatt være registrert som arbeidssøker?' });
        await expect(within(fortsette).getByRole('radio', { name: 'Ja' })).toHaveFocus();
    },
};

export const ValideringsfeilBokmal: Story = {
    args: { sprak: 'nb' },
    play: async ({ canvas }) => {
        const arbeid = canvas.getByRole('radiogroup', { name: /Har du vært i arbeid i perioden/ });
        const fortsette = canvas.getByRole('radiogroup', { name: 'Vil du fortsatt være registrert som arbeidssøker?' });
        const sendInn = canvas.getByRole('button', { name: 'Send inn' });

        await userEvent.click(sendInn);
        await expect(within(arbeid).getByRole('radio', { name: 'Ja' })).toHaveFocus();
        await expect(
            within(arbeid).getByRole('radio', { name: 'Ja', description: 'Du må svare før du kan sende inn' }),
        ).toBeVisible();

        await userEvent.click(within(arbeid).getByRole('radio', { name: 'Ja' }));
        await userEvent.click(sendInn);
        await expect(within(fortsette).getByRole('radio', { name: 'Ja' })).toHaveFocus();
        await expect(
            within(fortsette).getByRole('radio', { name: 'Ja', description: 'Du må svare før du kan sende inn' }),
        ).toBeVisible();
    },
};

export const ValideringsfeilNynorsk: Story = {
    args: { sprak: 'nn' },
    play: async ({ canvas }) => {
        await userEvent.click(canvas.getByRole('button', { name: 'Send inn' }));
        const arbeid = canvas.getByRole('radiogroup', { name: /Har du vore i arbeid i perioden/ });
        await expect(
            within(arbeid).getByRole('radio', { name: 'Ja', description: 'Du må svare før du kan sende inn' }),
        ).toBeVisible();
    },
};

export const ValideringsfeilEngelsk: Story = {
    args: { sprak: 'en' },
    play: async ({ canvas }) => {
        await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
        const arbeid = canvas.getByRole('radiogroup', { name: /Have you worked in the period/ });
        await expect(
            within(arbeid).getByRole('radio', { name: 'Yes', description: 'You must answer before submitting' }),
        ).toBeVisible();
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
            await canvas.findByText('Noe gikk dessverre galt. Forsøk igjen, eller kontakt Nav.'),
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

export const FokusAvsluttSteg: Story = {
    play: async ({ canvas }) => {
        const grupper = canvas.getAllByRole('radiogroup');
        await userEvent.click(within(grupper[0]).getByRole('radio', { name: 'Ja' }));
        await userEvent.click(within(grupper[1]).getByRole('radio', { name: 'Nei' }));
        await userEvent.click(canvas.getByRole('button', { name: 'Send inn' }));

        await expect(
            await canvas.findByRole('heading', { name: 'Bekreft at du ikke lenger ønsker å være arbeidssøker' }),
        ).toHaveFocus();
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
