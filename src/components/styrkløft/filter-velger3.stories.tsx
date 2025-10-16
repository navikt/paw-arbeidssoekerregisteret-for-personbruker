import type { Meta, StoryObj } from '@storybook/nextjs';
import FilterVelger3 from '@/components/styrkløft/filter-velger3';
import { useState } from 'react';

const meta = {
    title: 'Styrkløft/FilterVelger3',
    component: FilterVelger3,
    tags: ['autodocs'],
    args: {},
    render(args) {
        const [values, setValues] = useState(args.values);
        return <FilterVelger3 values={values} options={args.options} heading={args.heading} onChange={setValues} />
    },
} satisfies Meta<typeof FilterVelger3>;

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
