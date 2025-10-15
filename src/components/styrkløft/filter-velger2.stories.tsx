import type { Meta, StoryObj } from '@storybook/nextjs';
import FilterVelger2 from '@/components/styrkløft/filter-velger2';

const meta = {
    title: 'Styrkløft/FilterVelger2',
    component: FilterVelger2,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof FilterVelger2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IkkeValgt: Story = {
    args: {
        tekst: 'Velg kategori',
        options: ['Baker', 'Kokk'],
        heading: 'Velg kategori',
        onChange: console.log,
    },
};

// export const ÅpenDropdown: Story = {
//     args: {
//         tekst: 'Velg kategori',
//         options: ['Baker', 'Kokk'],
//         heading: 'Velg kategori',
//         onChange: console.log,
//         defaultOpen: true
//     }
// }

export const MedVerdi: Story = {
    args: {
        tekst: 'Kokk',
        options: ['Baker', 'Kokk'],
        heading: 'Velg kategori',
        onChange: console.log,
    },
};
