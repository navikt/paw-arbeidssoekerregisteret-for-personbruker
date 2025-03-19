import { Meta, StoryObj } from '@storybook/react';
import ManglerOpplysninger from './mangler-opplysninger';

const meta = {
    title: 'Komponenter/Mangler Opplysninger',
    component: ManglerOpplysninger,
    decorators: [],
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof ManglerOpplysninger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ManglerOpplysningerKomponent: Story = {
    args: {
        sprak: 'nb',
        oppdaterOpplysningerUrl: process.env.OPPDATER_OPPLYSNINGER_URL!,
        visAdvarsel: false
    },
};

export const ManglerOpplysningerMedInnlogginsAdvarsel: Story = {
    args: {
        sprak: 'nb',
        oppdaterOpplysningerUrl: process.env.OPPDATER_OPPLYSNINGER_URL!,
        visAdvarsel: true
    },
};

