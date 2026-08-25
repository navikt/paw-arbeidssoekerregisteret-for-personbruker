import { Box, Heading, VStack } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import ReserverteStillingerHarNyLandingsside from './reserverte-stillinger-ny-side';

const meta = {
    title: 'Styrkløft/Komponenter/Reserverte stillinger har ny landingsside',
    component: ReserverteStillingerHarNyLandingsside,
    tags: ['autodocs'],
    args: {
        sprak: 'nb',
    },
} satisfies Meta<typeof ReserverteStillingerHarNyLandingsside>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AlleSprakvarianter: Story = {
    render: () => (
        <VStack gap="space-16">
            <Box>
                <Heading size="small" level="2" spacing>
                    Bokmål (nb)
                </Heading>
                <ReserverteStillingerHarNyLandingsside sprak="nb" />
            </Box>
            <Box>
                <Heading size="small" level="2" spacing>
                    Nynorsk (nn)
                </Heading>
                <ReserverteStillingerHarNyLandingsside sprak="nn" />
            </Box>
            <Box>
                <Heading size="small" level="2" spacing>
                    Engelsk (en)
                </Heading>
                <ReserverteStillingerHarNyLandingsside sprak="en" />
            </Box>
        </VStack>
    ),
};
