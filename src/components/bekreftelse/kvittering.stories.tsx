import type { Meta, StoryObj } from '@storybook/react';
import { Kvittering } from './kvittering';

const meta = {
    title: 'Bekreftelse/Komponenter/Kvittering',
    component: Kvittering,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof Kvittering>;

export default meta;
type Story = StoryObj<typeof meta>;

export const KvitteringStory: Story = {
    args: {
        sprak: 'nb',
        erUtmeldt: false,
        harFlereBekreftelser: false,
        onClick: () => console.log('onClick'),
    },
};

export const KvitteringUtmeldtStory: Story = {
    args: {
        sprak: 'nb',
        erUtmeldt: true,
        harFlereBekreftelser: false,
        onClick: () => console.log('onClick'),
    },
};

export const KvitteringFlereBekreftelserStory: Story = {
    args: {
        sprak: 'nb',
        erUtmeldt: false,
        harFlereBekreftelser: true,
        onClick: () => console.log('onClick'),
    },
};
