import type { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Box, VStack } from '@navikt/ds-react';
import { PageBlock } from '@navikt/ds-react/Page';
import type { ReactNode } from 'react';

interface BekreftelseSideProps {
    sprak: Sprak;
    children: ReactNode;
}

function BekreftelseSide({ children }: BekreftelseSideProps) {
    return (
        <PageBlock width="md">
            <Box asChild paddingBlock="space-32">
                <VStack>{children}</VStack>
            </Box>
        </PageBlock>
    );
}

export default BekreftelseSide;
