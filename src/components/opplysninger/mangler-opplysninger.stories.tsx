import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import ManglerOpplysninger from './mangler-opplysninger';

const meta = {
    title: 'Komponenter/Mangler Opplysninger',
    component: ManglerOpplysninger,
    decorators: [],
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof ManglerOpplysninger>;

export default meta;
type Story = StoryObj<typeof ManglerOpplysninger>;

export const Bokmal: Story = {
    args: {
        sprak: 'nb',
        oppdaterOpplysningerUrl: 'http://localhost:3000/oppdater-opplysninger',
        visAdvarsel: false,
    },
};

export const Nynorsk: Story = {
    args: {
        sprak: 'nn',
        oppdaterOpplysningerUrl: 'http://localhost:3000/oppdater-opplysninger',
        visAdvarsel: false,
    },
};

export const Engelsk: Story = {
    args: {
        sprak: 'en',
        oppdaterOpplysningerUrl: 'http://localhost:3000/oppdater-opplysninger',
        visAdvarsel: false,
    },
};

export const ManglerOpplysningerKomponent: Story = {
    args: {
        sprak: 'nb',
        oppdaterOpplysningerUrl: 'http://localhost:3000/oppdater-opplysninger',
        visAdvarsel: false,
    },
};

export const ManglerOpplysningerMedInnlogginsAdvarsel: Story = {
    args: {
        sprak: 'nb',
        oppdaterOpplysningerUrl: 'http://localhost:3000/oppdater-opplysninger',
        visAdvarsel: true,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await expect(
            canvas.getByText(
                'Du har logget inn med Min ID. For å kunne legge til opplysninger, vil du bli bedt om å logge inn med BankID, Buypass eller Commfides.',
            ),
        ).toBeVisible();
        await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();

        await userEvent.tab();
        await expect(canvas.getByRole('button', { name: 'Legg til flere opplysninger' })).toHaveFocus();
    },
};
