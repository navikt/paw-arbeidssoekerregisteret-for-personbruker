import type { Meta, StoryObj } from '@storybook/nextjs';
import Kvittering from '@/components/styrkløft/kvittering';

const meta = {
    title: 'Styrkløft/Kvittering',
    component: Kvittering,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof Kvittering>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultKvittering: Story = {};
