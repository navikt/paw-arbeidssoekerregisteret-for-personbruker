import type { Meta, StoryObj } from '@storybook/nextjs';
import NyhetUnderkategoriAlert from './NyhetUnderkategoriAlert';

const meta = {
    title: 'Styrkløft/Komponenter/Nyhet undekategorier',
    component: NyhetUnderkategoriAlert,
    tags: ['autodocs'],
    args: {
        sprak: 'nb',
    },
} satisfies Meta<typeof NyhetUnderkategoriAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultNyhet: Story = {};

export const NyhetBokmål: Story = {
    args: {
        sprak: 'nb',
    },
};

export const NyhetNynorsk: Story = {
    args: {
        sprak: 'nn',
    },
};

export const NyhetEngelsk: Story = {
    args: {
        sprak: 'en',
    },
};
