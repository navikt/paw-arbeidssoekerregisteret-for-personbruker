import type { Meta, StoryObj } from '@storybook/nextjs';
import UnderkategoriVelger from '@/components/styrkløft/underkategori-velger';
import { useState } from 'react';
import { byggYrkeskoderTilStyrkMap } from '@/lib/bygg-yrkeskoder-med-styrk-map';

const meta = {
    title: 'Styrkløft/Komponenter/UnderkategoriVelger',
    component: UnderkategoriVelger,
    tags: ['autodocs'],
    args: {},
    render: function Render(args) {
        const [values, setValues] = useState(args.values);
        console.log('values', values);
        return (
            <UnderkategoriVelger
                values={values}
                options={args.options}
                triggerText={args.triggerText}
                onChange={setValues}
            />
        );
    },
} satisfies Meta<typeof UnderkategoriVelger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        options: byggYrkeskoderTilStyrkMap(),
        values: [],
        triggerText: 'Velg kategori',
        onChange(values: string[]) {
            console.log('onChange', values);
        },
    },
};
