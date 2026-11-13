import { Box, Loader, VStack } from '@navikt/ds-react';
import { PageBlock } from '@navikt/ds-react/Page';

export default function Loading() {
    return (
        <PageBlock width="md">
            <Box asChild paddingBlock="space-32">
                <VStack>
                    <Loader size="xlarge" title="Laster innhold..." />
                </VStack>
            </Box>
        </PageBlock>
    );
}
