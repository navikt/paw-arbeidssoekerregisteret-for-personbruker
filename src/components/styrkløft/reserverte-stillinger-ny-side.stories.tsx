import { Box, Label, VStack } from '@navikt/ds-react';
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
    parameters: {
        a11y: {
            config: {
                rules: [{ id: 'landmark-unique', enabled: false }],
            },
        },
    },
    render: () => (
        <VStack gap="space-16">
            <Box>
                <Label spacing>Bokmål (nb)</Label>
                <ReserverteStillingerHarNyLandingsside sprak="nb" />
            </Box>
            <Box>
                <Label spacing>Nynorsk (nn)</Label>
                <ReserverteStillingerHarNyLandingsside sprak="nn" />
            </Box>
            <Box>
                <Label spacing>Engelsk (en)</Label>
                <ReserverteStillingerHarNyLandingsside sprak="en" />
            </Box>
        </VStack>
    ),
};
