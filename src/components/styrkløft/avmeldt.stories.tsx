import type { Meta, StoryObj } from '@storybook/nextjs';
import Avmeldt from '@/components/styrkløft/avmeldt';

const meta = {
    title: 'Styrkløft/Komponenter/Avmeldt',
    component: Avmeldt,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof Avmeldt>;

export default meta;
type Story = StoryObj<typeof meta>;

const MS_I_ETT_DOGN = 1000 * 60 * 60 * 24;

export const Default: Story = {
    args: {
        brukerprofil: {
            flagg: [{ navn: 'OPT_OUT', tidspunkt: new Date(Date.now() - 31 * MS_I_ETT_DOGN).toISOString() }],
        },
    } as any,
};
