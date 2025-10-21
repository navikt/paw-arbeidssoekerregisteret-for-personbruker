import type { Meta, StoryObj } from '@storybook/nextjs';
import Kvittering from '@/components/styrkløft/kvittering';
import LedigStilling from '@/components/styrkløft/ledig-stilling';

const meta = {
    title: 'Styrkløft/Ledig stilling',
    component: LedigStilling,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof LedigStilling>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultLedigStilling: Story = {
    args: {
        ledigStilling: {
            uuid: 'uuid',
            tittel: 'Nittedal Tannlegesenter har ledig stilling som tannhelsesekretær/tannlegeassistent, er du den rette?',
            stillingbeskrivelse: 'Tannlegeassistent, Tannhelsesekretær, Klinikkassistent',
            selskap: 'Nittedal Tannlegesenter Og Tannlegevakt',
            kommune: 'Nittedal, Norge, Oslo, Akershus',
            soeknadsfrist: {
                raw: 'Søk senest torsdag 6. november'
            }
        },
    },
};
