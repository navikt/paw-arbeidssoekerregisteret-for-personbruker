import { ProfilertTil } from '@navikt/arbeidssokerregisteret-utils';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent } from 'storybook/test';
import Egenvurdering from '@/components/egenvurdering/egenvurdering-stateless';

const meta = {
    title: 'Komponenter/Egenvurdering/Stateless',
    component: Egenvurdering,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof Egenvurdering>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MedAntattGodeMuligheter: Story = {
    args: {
        sprak: 'nb',
        profilering: {
            profilertTil: ProfilertTil.ANTATT_GODE_MULIGHETER,
        } as any,
        pendingRequest: null,
        visFeilmelding: false,
        onSubmit: fn(async () => {}),
    },
    play: async ({ canvas, args }) => {
        await userEvent.click(canvas.getByRole('button', { name: 'Jeg klarer meg uten hjelp' }));
        await expect(args.onSubmit).toHaveBeenNthCalledWith(1, ProfilertTil.ANTATT_GODE_MULIGHETER);

        await userEvent.click(canvas.getByRole('button', { name: 'Jeg ønsker hjelp fra en veileder' }));
        await expect(args.onSubmit).toHaveBeenNthCalledWith(2, ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING);
    },
};

export const MedAntattAntattBehovForVeiledning: Story = {
    args: {
        sprak: 'nb',
        profilering: {
            profilertTil: ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING,
        } as any,
        pendingRequest: null,
        visFeilmelding: false,
        onSubmit: fn(async () => {}),
    },
    play: async ({ canvas, args }) => {
        await userEvent.click(canvas.getByRole('button', { name: 'Ja, jeg ønsker hjelp' }));
        await expect(args.onSubmit).toHaveBeenNthCalledWith(1, ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING);

        await userEvent.click(canvas.getByRole('button', { name: 'Nei, jeg vil gjerne klare meg selv' }));
        await expect(args.onSubmit).toHaveBeenNthCalledWith(2, ProfilertTil.ANTATT_GODE_MULIGHETER);
    },
};

export const MedPendingRequest: Story = {
    args: {
        sprak: 'nb',
        profilering: {
            profilertTil: ProfilertTil.ANTATT_GODE_MULIGHETER,
        } as any,
        pendingRequest: ProfilertTil.ANTATT_GODE_MULIGHETER,
        visFeilmelding: false,
        onSubmit: fn(async () => {}),
    },
    play: async ({ canvas }) => {
        await expect(canvas.getByRole('button', { name: 'Venter…' })).toBeDisabled();
        await expect(canvas.getByRole('button', { name: 'Jeg ønsker hjelp fra en veileder' })).toBeDisabled();
    },
};

export const MedVisFeilmelding: Story = {
    args: {
        sprak: 'nb',
        profilering: {
            profilertTil: ProfilertTil.ANTATT_GODE_MULIGHETER,
        } as any,
        pendingRequest: null,
        visFeilmelding: true,
        onSubmit: fn(async () => {}),
    },
    play: async ({ canvas }) => {
        await expect(await canvas.findByRole('alert')).toBeVisible();
        await expect(
            canvas.getByText('Vi klarte ikke lagre svaret ditt, prøv igjen om et par minutter.'),
        ).toBeVisible();
    },
};

export const Nynorsk: Story = {
    args: {
        ...MedAntattGodeMuligheter.args,
        sprak: 'nn',
        onSubmit: fn(async () => {}),
    },
};

export const English: Story = {
    args: {
        ...MedAntattGodeMuligheter.args,
        sprak: 'en',
        onSubmit: fn(async () => {}),
    },
};
