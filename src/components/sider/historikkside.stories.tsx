import type { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import type { Periode } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { Loader } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ReactNode } from 'react';
import { expect, userEvent } from 'storybook/test';
import { createPeriodeStartetHendelse } from '@/components/perioder/__tests__/utils/hendelser';
import { HistorikkInnhold, HistorikkSide } from './historikkside';

const DEMO_PERIODER: Periode[] = [
    {
        identitetsnummer: 'synthetic-user',
        periodeId: 'demo-period-1',
        startet: '2025-01-13T10:00:00Z',
        hendelser: [createPeriodeStartetHendelse()],
    },
    {
        identitetsnummer: 'synthetic-user',
        periodeId: 'demo-period-2',
        startet: '2024-12-01T10:00:00Z',
        avsluttet: '2025-01-12T10:00:00Z',
        hendelser: [createPeriodeStartetHendelse('2024-12-01T10:00:00Z')],
    },
];

function renderSide(sprak: Sprak, innhold: ReactNode) {
    return (
        <main id="maincontent" tabIndex={-1}>
            <HistorikkSide sprak={sprak}>{innhold}</HistorikkSide>
        </main>
    );
}

const meta = {
    title: 'Sider/Historikk',
    component: HistorikkSide,
    args: {
        sprak: 'nb',
        children: null,
    },
    parameters: {
        uu: {
            helSide: true,
        },
        a11y: {
            config: {
                rules: [{ id: 'region', enabled: true }],
            },
        },
    },
} satisfies Meta<typeof HistorikkSide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bokmal: Story = {
    render: ({ sprak }) => renderSide(sprak, <HistorikkInnhold sprak={sprak} perioder={DEMO_PERIODER} />),
    play: async ({ canvas }) => {
        const visDetaljer = await canvas.findByRole('checkbox', { name: 'Vis detaljer' });
        await userEvent.tab();
        await expect(visDetaljer).toHaveFocus();
        await userEvent.keyboard(' ');
        await expect(visDetaljer).not.toBeChecked();

        await userEvent.keyboard(' ');
        await expect(visDetaljer).toBeChecked();

        await userEvent.tab();
        const periode = await canvas.findByRole('button', { name: /13\. januar 2025 - Fortsatt pågående/ });
        await expect(periode).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        await expect(periode).toHaveAttribute('aria-expanded', 'true');
        await expect(periode).toHaveFocus();

        await userEvent.keyboard(' ');
        await expect(periode).toHaveAttribute('aria-expanded', 'false');
        await expect(periode).toHaveFocus();
    },
};

export const Nynorsk: Story = {
    render: () => renderSide('nn', <HistorikkInnhold sprak="nn" perioder={DEMO_PERIODER} />),
};

export const English: Story = {
    render: () => renderSide('en', <HistorikkInnhold sprak="en" perioder={DEMO_PERIODER} />),
};

export const Tom: Story = {
    render: () => renderSide('nb', <HistorikkInnhold sprak="nb" perioder={[]} />),
};

export const Feil: Story = {
    render: () =>
        renderSide('nb', <HistorikkInnhold sprak="nb" perioder={null} error={new Error('Synthetic error')} />),
};

export const Laster: Story = {
    render: () =>
        renderSide(
            'nb',
            <div className="text-center">
                <Loader size="large" />
            </div>,
        ),
};
