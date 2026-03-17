import type { Meta, StoryObj } from '@storybook/nextjs';
import DirektemeldtStilling from '@/components/styrkløft/direktemeldt-stilling';

const meta = {
    title: 'Styrkløft/Komponenter/Direktemeldt stilling',
    component: DirektemeldtStilling,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof DirektemeldtStilling>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultDirektemeldtStilling: Story = {
    args: {
        ledigStilling: {
            arbeidsplassenNoId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            tittel: 'Nittedal Tannlegesenter har ledig stilling som tannhelsesekretær/tannlegeassistent, er du den rette?',
            stillingbeskrivelse: 'Tannlegeassistent, Tannhelsesekretær, Klinikkassistent',
            selskap: 'Nittedal Tannlegesenter Og Tannlegevakt',
            kommune: 'Nittedal, Norge, Oslo, Akershus',
            soeknadsfrist: {
                raw: 'Søk senest torsdag 6. november',
            },
            publisert: '',
            land: 'no',
            tags: ['DIREKTEMELDT_V1'],
            sektor: 'Ukjent',
        },
    },
};
