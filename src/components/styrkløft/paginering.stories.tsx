import type { Meta, StoryObj } from '@storybook/nextjs';
import Paginering from '@/components/styrkløft/paginering';

const meta = {
    title: 'Styrkløft/Komponenter/Paginering',
    component: Paginering,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof Paginering>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        antallSider: 2,
        aktivSide: 1,
        onClick: (side) => console.log('side', side),
    },
};

export const AktivSide2: Story = {
    args: {
        antallSider: 3,
        aktivSide: 2,
        onClick: (side) => console.log('side', side),
    },
};
