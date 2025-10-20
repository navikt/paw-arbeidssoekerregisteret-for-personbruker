import type { Meta, StoryObj } from '@storybook/nextjs';
import { KvitteringAvmeldt } from '@/components/styrkløft/kvittering-avmeldt';

const meta = {
    title: 'Styrkløft/Kvittering avmeldt',
    component: KvitteringAvmeldt,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof KvitteringAvmeldt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultKvittering: Story = {};
