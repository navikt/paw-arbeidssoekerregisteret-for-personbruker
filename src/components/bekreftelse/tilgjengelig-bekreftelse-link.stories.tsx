import type { Meta, StoryObj } from '@storybook/react';
import { TilgjengeligBekreftelseLink } from '@/components/bekreftelse/tilgjengelig-bekreftelse-link';

const meta = {
    title: 'Bekreftelse/Komponenter/TilgjengeligBekreftelseLink',
    component: TilgjengeligBekreftelseLink,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof TilgjengeligBekreftelseLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IngenTilgjengeligeBekreftelser: Story = {
    args: {
        tilgjengeligeBekreftelser: [],
        sprak: 'nb',
    },
};

export const TilgjengeligeBekreftelser: Story = {
    args: {
        tilgjengeligeBekreftelser: [
            {
                gjelderFra: '2024-08-01',
                gjelderTil: '2024-08-15',
                bekreftelseId: '42',
                periodeId: '1',
            },
        ],
        sprak: 'nb',
    },
};
