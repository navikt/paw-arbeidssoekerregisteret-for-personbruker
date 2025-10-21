import type { Meta, StoryObj } from '@storybook/nextjs';
import VelgStillingssoek from '@/components/styrkløft/velg-stillingssoek';

const meta = {
    title: 'Styrkløft/Kvittering',
    component: VelgStillingssoek,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof VelgStillingssoek>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultKvittering: Story = {};
