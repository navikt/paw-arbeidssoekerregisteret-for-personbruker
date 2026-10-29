import type { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { VStack } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
