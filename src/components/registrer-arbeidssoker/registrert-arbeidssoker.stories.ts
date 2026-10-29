import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import RegistrerArbeidssoker from '@/components/registrer-arbeidssoker/registrer-arbeidssoker';

const meta = {
    title: 'Komponenter/RegistrerArbeidssoker',
    component: RegistrerArbeidssoker,
    decorators: [],
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof RegistrerArbeidssoker>;

export default meta;
type Story = StoryObj<typeof RegistrerArbeidssoker>;

export const Bokmal: Story = {
    args: {
        registrerArbeidssokerUrl: 'http://localhost:3000/registrer-arbeidssoker',
        sprak: 'nb',
    },
};

export const Nynorsk: Story = {
    args: {
        registrerArbeidssokerUrl: 'http://localhost:3000/registrer-arbeidssoker',
        sprak: 'nn',
    },
};

export const Engelsk: Story = {
    args: {
        registrerArbeidssokerUrl: 'http://localhost:3000/registrer-arbeidssoker',
        sprak: 'en',
    },
};

export const RegistrertArbeidssoker: Story = {
    args: {
        registrerArbeidssokerUrl: 'http://localhost:3000/registrer-arbeidssoker',
        sprak: 'nb',
    },
};
