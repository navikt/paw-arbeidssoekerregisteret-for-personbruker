import type { Sprak, TilgjengeligeBekreftelser } from '@navikt/arbeidssokerregisteret-utils';
import type { BekreftelseHendelse } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Bekreftelse, type BekreftelseProps } from '@/components/bekreftelse/bekreftelse';
import BekreftelseSide from './bekreftelsesside';

const tilgjengeligeBekreftelser: TilgjengeligeBekreftelser = [
    {
        gjelderFra: '2026-10-01',
        gjelderTil: '2026-10-14',
        bekreftelseId: 'syntetisk-bekreftelse-1',
        periodeId: 'syntetisk-periode-1',
    },
    {
        gjelderFra: '2026-10-15',
        gjelderTil: '2026-10-28',
        bekreftelseId: 'syntetisk-bekreftelse-2',
        periodeId: 'syntetisk-periode-2',
    },
];

const sistInnsendteBekreftelse: BekreftelseHendelse = {
    type: 'BEKREFTELSE_V1',
    id: 'syntetisk-hendelse-1',
    bekreftelsesloesning: 'ARBEIDSSOEKERREGISTERET',
    status: 'GYLDIG',
    tidspunkt: '2026-10-15T12:00:00.000Z',
    svar: {
        sendtInnAv: {
            tidspunkt: '2026-10-15T12:00:00.000Z',
            utfoertAv: { type: 'SLUTTBRUKER', id: 'syntetisk-bruker' },
            kilde: 'storybook',
            aarsak: 'syntetisk testdata',
        },
        gjelderFra: '2026-10-01T00:00:00.000Z',
        gjelderTil: '2026-10-14T23:59:59.999Z',
        harJobbetIDennePerioden: true,
        vilFortsetteSomArbeidssoeker: true,
    },
};

function BekreftelseHelSide(props: BekreftelseProps) {
    return (
        <main id="maincontent" tabIndex={-1}>
            <BekreftelseSide sprak={props.sprak}>
                <Bekreftelse {...props} />
            </BekreftelseSide>
        </main>
    );
}

const meta = {
    title: 'Sider/Bekreftelse',
    component: BekreftelseHelSide,
    tags: ['autodocs'],
    args: {
        sprak: 'nb',
        erAktivArbeidssoker: true,
        sistInnsendteBekreftelse: undefined,
        tilgjengeligeBekreftelser,
        registrerArbeidssokerUrl: 'https://www.nav.no/arbeid/arbeidssoker',
        onSubmit: fn(async () => {}),
    },
    parameters: {
        nextjs: { appDirectory: true },
        uu: { helSide: true },
        a11y: {
            config: {
                rules: [{ id: 'region', enabled: true }],
            },
        },
    },
} satisfies Meta<typeof BekreftelseHelSide>;

export default meta;
type Story = StoryObj<typeof meta>;
type StoryPlayContext = Parameters<NonNullable<Story['play']>>[0];

const labels = {
    nb: { yes: 'Ja', no: 'Nei', submit: 'Send inn' },
    nn: { yes: 'Ja', no: 'Nei', submit: 'Send inn' },
    en: { yes: 'Yes', no: 'No', submit: 'Submit' },
} satisfies Record<'nb' | 'nn' | 'en', { yes: string; no: string; submit: string }>;

async function submitWithKeyboard(
    canvas: StoryPlayContext['canvas'],
    sprak: 'nb' | 'nn' | 'en',
    answers: [boolean?, boolean?] = [true, true],
) {
    const groups = await canvas.findAllByRole('radiogroup');

    for (const [index, group] of groups.entries()) {
        await userEvent.tab();
        const answer = answers[index];
        if (typeof answer === 'undefined') continue;

        const radios = within(group);
        const selectedRadio = radios.getByRole('radio', { name: answer ? labels[sprak].yes : labels[sprak].no });
        if (answer) {
            await userEvent.keyboard(' ');
        } else {
            await userEvent.keyboard('{ArrowRight}');
        }
        await expect(selectedRadio).toHaveFocus();
        await expect(selectedRadio).toBeChecked();
    }

    await userEvent.tab();
    const submit = await canvas.findByRole('button', { name: labels[sprak].submit });
    await expect(submit).toHaveFocus();
    await userEvent.keyboard('{Enter}');
}

export const Bokmal: Story = {
    play: async ({ canvas, args }) => {
        await submitWithKeyboard(canvas, 'nb');

        const heading = await canvas.findByRole('heading', {
            name: 'Du har bekreftet at du fortsatt vil være registrert som arbeidssøker',
        });
        await expect(heading).toHaveFocus();
        await expect(args.onSubmit).toHaveBeenCalledWith({
            harJobbetIDennePerioden: true,
            vilFortsetteSomArbeidssoeker: true,
            bekreftelseId: 'syntetisk-bekreftelse-1',
        });
    },
};

export const Nynorsk: Story = {
    args: { sprak: 'nn' },
    play: async ({ canvas }) => {
        await expect(
            await canvas.findByRole('heading', { name: 'Stadfest at du ønskjer å vere registrert som arbeidssøkjar' }),
        ).toBeVisible();
    },
};

export const English: Story = {
    args: { sprak: 'en' },
    play: async ({ canvas }) => {
        await expect(
            await canvas.findByRole('heading', { name: 'Confirm that you want to stay registered as a jobseeker' }),
        ).toBeVisible();
    },
};

export const IngenTilgjengeligeMedSisteSvar: Story = {
    args: {
        tilgjengeligeBekreftelser: [],
        sistInnsendteBekreftelse,
    },
    play: async ({ canvas }) => {
        await expect(await canvas.findAllByRole('heading', { level: 1 })).toHaveLength(1);
        await expect(
            await canvas.findByRole('heading', { level: 2, name: /Du har ingen bekreftelser å sende inn/ }),
        ).toBeVisible();
        await expect(await canvas.findByRole('link')).toBeVisible();
    },
};

export const IngenTilgjengeligeUtenSisteSvar: Story = {
    args: {
        tilgjengeligeBekreftelser: [],
        sistInnsendteBekreftelse: undefined,
    },
    play: async ({ canvas }) => {
        await expect(await canvas.findAllByRole('heading', { level: 1 })).toHaveLength(1);
        await expect(await canvas.findByText('Du har ingen bekreftelser å sende inn')).toBeVisible();
        await expect(await canvas.findByRole('link')).toBeVisible();
    },
};

export const IngenTilgjengeligeUtenSisteSvarNynorsk: Story = {
    args: {
        sprak: 'nn',
        tilgjengeligeBekreftelser: [],
        sistInnsendteBekreftelse: undefined,
    },
    play: async ({ canvas }) => {
        await expect(await canvas.findAllByRole('heading', { level: 1 })).toHaveLength(1);
        await expect(
            await canvas.findByRole('heading', { level: 1, name: /Du har ingen stadfestingar å senda inn/ }),
        ).toBeVisible();
        await expect(await canvas.findByRole('link')).toBeVisible();
    },
};

export const IngenTilgjengeligeUtenSisteSvarEnglish: Story = {
    args: {
        sprak: 'en',
        tilgjengeligeBekreftelser: [],
        sistInnsendteBekreftelse: undefined,
    },
    play: async ({ canvas }) => {
        await expect(await canvas.findAllByRole('heading', { level: 1 })).toHaveLength(1);
        await expect(
            await canvas.findByRole('heading', { level: 1, name: /You have no confirmation forms to submit/ }),
        ).toBeVisible();
        await expect(await canvas.findByRole('link')).toBeVisible();
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

export const VenterPaInnsending: Story = {
    args: {
        onSubmit: fn(() => new Promise<void>(() => {})),
    },
    play: async ({ canvas }) => {
        await submitWithKeyboard(canvas, 'nb');
        await expect((await canvas.findAllByRole('button'))[0]).toBeDisabled();
    },
};

export const ValideringsfeilUtenSvar: Story = {
    play: async ({ canvas }) => {
        await submitWithKeyboard(canvas, 'nb', []);
        await expect(await canvas.findAllByText('Du må svare før du kan sende inn')).toHaveLength(2);
        await expect(
            within((await canvas.findAllByRole('radiogroup'))[0]).getByRole('radio', { name: 'Ja' }),
        ).toHaveFocus();
    },
};

export const ValideringsfeilEttSvar: Story = {
    play: async ({ canvas }) => {
        await submitWithKeyboard(canvas, 'nb', [true]);
        await expect(await canvas.findByText('Du må svare før du kan sende inn')).toBeVisible();
        await expect((await canvas.findAllByRole('radio', { name: 'Ja' }))[1]).toHaveFocus();
    },
};

export const FeilVedInnsending: Story = {
    args: {
        onSubmit: fn(async () => {
            throw new Error('Syntetisk innsendingfeil');
        }),
    },
    play: async ({ canvas }) => {
        await submitWithKeyboard(canvas, 'nb');
        await expect(
            await canvas.findByText('Noe gikk dessverre galt. Forsøk igjen, eller kontakt Nav.'),
        ).toBeVisible();
    },
};

export const AvsluttArbeidssoker: Story = {
    play: async ({ canvas }) => {
        await submitWithKeyboard(canvas, 'nb', [true, false]);
        const heading = await canvas.findByRole('heading', {
            name: 'Bekreft at du ikke lenger ønsker å være arbeidssøker',
        });
        await expect(heading).toHaveFocus();
    },
};

export const FullforAvslutningMedTastatur: Story = {
    args: { onSubmit: fn(async () => {}) },
    play: async ({ canvas, args }) => {
        await submitWithKeyboard(canvas, 'nb', [true, false]);
        await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();

        await userEvent.tab();
        await userEvent.tab();
        const confirm = await canvas.findByRole('button', { name: 'Jeg vil ikke være registrert som arbeidssøker' });
        await expect(confirm).toHaveFocus();
        await userEvent.keyboard('{Enter}');

        const receiptHeading = await canvas.findByRole('heading', {
            level: 1,
            name: 'Du er ikke lenger registrert som arbeidssøker',
        });
        await expect(receiptHeading).toHaveFocus();
        await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();
        await expect(args.onSubmit).toHaveBeenCalledWith({
            harJobbetIDennePerioden: true,
            vilFortsetteSomArbeidssoeker: false,
            bekreftelseId: 'syntetisk-bekreftelse-1',
        });
    },
};

export const AvbrytAvslutningBevarerSvar: Story = {
    play: async ({ canvas, args }) => {
        await submitWithKeyboard(canvas, 'nb', [true, false]);
        await expect(
            await canvas.findByRole('heading', { name: 'Bekreft at du ikke lenger ønsker å være arbeidssøker' }),
        ).toHaveFocus();

        await userEvent.tab();
        await userEvent.tab();
        await userEvent.tab();
        const cancel = await canvas.findByRole('button', { name: 'Avbryt og gå tilbake' });
        await expect(cancel).toHaveFocus();
        await userEvent.keyboard('{Enter}');

        const groups = await canvas.findAllByRole('radiogroup');
        await expect(within(groups[0]).getByRole('radio', { name: 'Ja' })).toBeChecked();
        await expect(within(groups[1]).getByRole('radio', { name: 'Nei' })).toBeChecked();
        await expect(args.onSubmit).not.toHaveBeenCalled();
    },
};

export const FlerePerioder: Story = {
    play: async ({ canvas, args }) => {
        await submitWithKeyboard(canvas, 'nb');
        const receiptHeading = await canvas.findByRole('heading', {
            name: 'Du har bekreftet at du fortsatt vil være registrert som arbeidssøker',
        });
        await expect(receiptHeading).toHaveFocus();

        await userEvent.tab();
        const nextPeriod = await canvas.findByRole('button', { name: 'Bekreft neste periode' });
        await expect(nextPeriod).toHaveFocus();
        await userEvent.keyboard('{Enter}');

        await expect(
            await canvas.findByRole('heading', { name: 'Bekreft at du vil være registrert som arbeidssøker' }),
        ).toBeVisible();
        const groups = await canvas.findAllByRole('radiogroup');
        for (const group of groups) {
            await expect(within(group).getByRole('radio', { name: 'Ja' })).not.toBeChecked();
            await expect(within(group).getByRole('radio', { name: 'Nei' })).not.toBeChecked();
        }
        await expect(args.onSubmit).toHaveBeenCalledTimes(1);
    },
};
