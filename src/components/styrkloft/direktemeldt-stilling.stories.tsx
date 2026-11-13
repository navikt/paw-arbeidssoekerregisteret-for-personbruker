import { Box } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent } from 'storybook/test';
import DirektemeldtStilling from '@/components/styrkloft/direktemeldt-stilling';

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
        sprak: 'nb',
        jobbmuligheterUrl: 'https://arbeidsplassen.nav.no',
    },
};

export const Bokmal: Story = {
    args: { ...DefaultDirektemeldtStilling.args, sprak: 'nb' },
};

export const Nynorsk: Story = {
    args: { ...DefaultDirektemeldtStilling.args, sprak: 'nn' },
};

export const Engelsk: Story = {
    args: { ...DefaultDirektemeldtStilling.args, sprak: 'en' },
};

export const Mobil320pxLangeTekster: Story = {
    args: DefaultDirektemeldtStilling.args,
    render: (args) => (
        <Box width="320px" data-testid="mobil-container">
            <DirektemeldtStilling {...args} />
        </Box>
    ),
    play: async ({ canvas, canvasElement }) => {
        const link = canvas.getByRole('link');
        await expect(link).toHaveAttribute(
            'href',
            'https://arbeidsplassen.nav.no/stilling/3fa85f64-5717-4562-b3fc-2c963f66afa6',
        );

        await userEvent.tab();
        await expect(link).toHaveFocus();

        const container = canvas.getByTestId('mobil-container');
        await expect(container.getBoundingClientRect().width).toBe(320);
        await expect(container.scrollWidth).toBeLessThanOrEqual(container.clientWidth);

        const card = link.closest('h2')?.parentElement;
        if (!card) {
            throw new Error('Fant ikke stillingskortet.');
        }
        await expect(card.scrollWidth).toBeLessThanOrEqual(card.clientWidth);

        const icons = canvasElement.querySelectorAll('svg');
        await expect(icons).toHaveLength(2);
        for (const icon of icons) {
            await expect(icon).toHaveAttribute('aria-hidden', 'true');
            await expect(icon).not.toHaveAttribute('title');
        }
    },
};

export const UtenValgfrieOpplysninger: Story = {
    args: {
        sprak: 'nb',
        ledigStilling: {
            arbeidsplassenNoId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            tittel: 'Reservert stilling uten valgfrie opplysninger',
            publisert: '',
            soeknadsfrist: {},
            land: 'no',
            sektor: 'Ukjent',
            selskap: 'Arbeidsgiver',
            tags: ['DIREKTEMELDT_V1'],
        },
        jobbmuligheterUrl: 'https://arbeidsplassen.nav.no',
    },
};
