import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
};
