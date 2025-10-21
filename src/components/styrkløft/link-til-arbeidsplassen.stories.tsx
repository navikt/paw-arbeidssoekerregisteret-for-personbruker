import { Meta, StoryObj } from '@storybook/nextjs';
import { LinkTilArbeidsplassen } from './link-til-arbeidsplassen';
import { mockBrukerprofil } from '@/lib/brukerprofil/mock-data';

const meta = {
    title: 'Styrkløft/Link til arbeidsplassen',
    component: LinkTilArbeidsplassen,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof LinkTilArbeidsplassen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultLinkTilArbeidsplassen: Story = {
    args: {
        brukerprofil: mockBrukerprofil,
        sprak: 'nb',
    },
};
