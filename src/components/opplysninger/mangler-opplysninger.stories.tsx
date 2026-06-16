import type { Meta, StoryObj } from '@storybook/nextjs';
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

export const ManglerOpplysningerKomponent: Story = {
    args: {
        sprak: 'nb',
        oppdaterOpplysningerUrl: 'http://localhost:3000/magler-opplysninger',
        visAdvarsel: false,
    },
};

export const ManglerOpplysningerMedInnlogginsAdvarsel: Story = {
    args: {
        sprak: 'nb',
        oppdaterOpplysningerUrl: 'http://localhost:3000/magler-opplysninger',
        visAdvarsel: true,
    },
};
