import type { Meta, StoryObj } from '@storybook/nextjs';
import MultiCheckboxFacet from '@/components/styrkløft/multi-checkbox-facet';
import { useState } from 'react';

const meta = {
    title: 'Styrkløft/Komponenter/MultiCheckboxFacet',
    component: MultiCheckboxFacet,
    tags: ['autodocs'],
    args: {},
    render: function Render(args) {
        const [values, setValues] = useState(args.values);
        return (
            <MultiCheckboxFacet
                values={values}
                options={args.options}
                triggerText={args.triggerText}
                onChange={setValues}
            />
        );
    },
} satisfies Meta<typeof MultiCheckboxFacet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        options: [
            { navn: 'IT', subKategorier: [{ navn: 'Drift' }, { navn: 'Utvikling' }] },
            { navn: 'Helse', subKategorier: [{ navn: 'Vernepleier' }, { navn: 'Sykepleier' }] },
        ],
        values: [],
        triggerText: 'Velg kategori',
        onChange(values: string[]) {
            console.log('onChange', values);
        },
    },
};
