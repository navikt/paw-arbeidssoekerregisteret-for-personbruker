import type { Meta, StoryObj } from '@storybook/nextjs';
import StillingerUtenKravToggler from '@/components/styrkløft/stillinger-uten-krav-toggler';

const meta = {
    title: 'Styrkløft/Komponenter/StillingerUtenKravToggler',
    component: StillingerUtenKravToggler,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof StillingerUtenKravToggler>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {
    args: {
        checked: true,
        onChange: (val) => console.log('onChange', val),
        tekst: 'Vis kun stillinger uten krav',
    },
};

export const Unchecked: Story = {
    args: {
        checked: false,
        onChange: (val) => console.log('onChange', val),
        tekst: 'Vis kun stillinger uten krav',
    },
};
