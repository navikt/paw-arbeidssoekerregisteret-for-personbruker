import type { Meta, StoryObj } from '@storybook/nextjs';
import FilterVelger from '@/components/styrkløft/filter-velger';

const meta = {
    title: 'Styrkløft/FilterVelger',
    component: FilterVelger,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof FilterVelger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IkkeValgt: Story = {
    args: {
        tekst: 'Velg kategori',
        options: ['Baker', 'Kokk'],
        heading: 'Velg kategori',
        onChange: console.log,
    }
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
    }
}
