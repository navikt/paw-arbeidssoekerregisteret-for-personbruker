import { Meta, StoryObj } from '@storybook/nextjs';
import RegistrerArbeidssoker from '@/components/registrer-arbeidssoker/registrer-arbeidssoker';

const meta = {
    title: 'Komponenter/RegistrerArbeidssoker',
    component: RegistrerArbeidssoker,
    decorators: [],
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof RegistrerArbeidssoker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RegistrertArbeidssoker: Story = {
    args: {
        registrerArbeidssokerUrl: process.env.REGISTRER_ARBEIDSSOKER_URL!,
        sprak: 'nb'
    }
}
