import { Box, HStack, Loader } from '@navikt/ds-react';
import { PageBlock } from '@navikt/ds-react/Page';

export default function Loading() {
    return (
        <PageBlock width="md">
            <Box asChild paddingBlock="space-32" paddingInline="space-16">
                <HStack justify="center">
                    <Loader size="large" title="Laster innhold..." />
                </HStack>
            </Box>
        </PageBlock>
    );
}
