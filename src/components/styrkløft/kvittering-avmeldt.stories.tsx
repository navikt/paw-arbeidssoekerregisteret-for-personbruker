import type { Meta, StoryObj } from '@storybook/nextjs';
import { KvitteringAvmeldt } from '@/components/styrkløft/kvittering-avmeldt';

const meta = {
    title: 'Styrkløft/Komponenter/Kvittering avmeldt',
    component: KvitteringAvmeldt,
    tags: ['autodocs'],
    args: {
        sprak: 'nb',
    },
} satisfies Meta<typeof KvitteringAvmeldt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultKvittering: Story = {};
