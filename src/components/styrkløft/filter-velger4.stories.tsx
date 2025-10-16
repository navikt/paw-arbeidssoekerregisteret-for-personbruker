import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import FilterVelger4 from '@/components/styrkløft/filter-velger4';

const meta = {
    title: 'Styrkløft/FilterVelger4',
    component: FilterVelger4,
    tags: ['autodocs'],
    args: {},
    render(args) {
        const [values, setValues] = useState(args.values);
        return <FilterVelger4 values={values} options={args.options} heading={args.heading} onChange={setValues} />;
    },
} satisfies Meta<typeof FilterVelger4>;

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
