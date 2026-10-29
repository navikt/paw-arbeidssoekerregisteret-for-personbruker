import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LinkTilDirektemeldteStillinger } from '@/components/styrkloft/link-til-direktemeldte-stillinger';

const meta = {
    title: 'Styrkløft/Komponenter/Link til direktemeldte stillinger',
    component: LinkTilDirektemeldteStillinger,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof LinkTilDirektemeldteStillinger>;

export default meta;
type Story = StoryObj<typeof meta>;

const jobbmuligheterUrl = 'https://www.nav.no/arbeidsplassen';

export const Bokmal: Story = {
    args: {
        jobbmuligheterUrl,
        sprak: 'nb',
    },
};

export const Nynorsk: Story = {
    args: {
        jobbmuligheterUrl,
        sprak: 'nn',
    },
};

export const English: Story = {
    args: {
        jobbmuligheterUrl,
        sprak: 'en',
    },
};
