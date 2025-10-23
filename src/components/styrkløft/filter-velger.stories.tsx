import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import FilterVelger from '@/components/styrkløft/filter-velger';

const meta = {
    title: 'Styrkløft/Komponenter/FilterVelger',
    component: FilterVelger,
    tags: ['autodocs'],
    args: {},
    render(args) {
        const [values, setValues] = useState(args.values);
        return <FilterVelger values={values} options={args.options} heading={args.heading} onChange={setValues} />;
    },
} satisfies Meta<typeof FilterVelger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IkkeValgt: Story = {
    args: {
        values: [],
        options: ['Baker', 'Kokk', 'Snekker', 'Rikskjendis', 'Riksmeglingsmann', 'Riksklyse', 'Fotballdommer'],
        heading: 'Velg kategori',
        onChange: console.log,
    },
};

export const MedVerdi: Story = {
    args: {
        values: ['Kokk', 'Snekker'],
        options: ['Baker', 'Kokk', 'Snekker', 'Rikskjendis', 'Riksmeglingsmann', 'Riksklyse', 'Fotballdommer'],
        heading: 'Velg kategori',
        onChange: console.log,
    },
};
