import type { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { VStack } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent } from 'storybook/test';
import ReadMoreVeileder from './readmore-veileder';
import ReadMoreVurdering from './readmore-vurdering';

interface ReadMoreStoriesProps {
    sprak: Sprak;
}

const meta = {
    title: 'Egenvurdering/Read more',
    args: {
        sprak: 'nb',
    },
    render: ({ sprak }: ReadMoreStoriesProps) => (
        <VStack gap="space-16">
            <ReadMoreVeileder sprak={sprak} />
            <ReadMoreVurdering sprak={sprak} />
        </VStack>
    ),
} satisfies Meta<ReadMoreStoriesProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bokmal: Story = {};

export const Nynorsk: Story = {
    args: {
        sprak: 'nn',
    },
};

export const English: Story = {
    args: {
        sprak: 'en',
    },
};

export const VeilederApenViaTastatur: Story = {
    play: async ({ canvas }) => {
        const readMore = canvas.getByRole('button', { name: 'Hva slags hjelp kan du få fra en veileder?' });
        await userEvent.tab();
        await expect(readMore).toHaveFocus();
        await userEvent.keyboard('{Enter}');

        await expect(readMore).toHaveAttribute('aria-expanded', 'true');
        await expect(canvas.getByText(/Veilederens oppgave er å besvare spørsmål/)).toBeVisible();
    },
};
