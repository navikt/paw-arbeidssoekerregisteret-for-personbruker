'use client'; // Error boundaries must be Client Components

import { Box, ErrorSummary, Heading, Page } from '@navikt/ds-react';
import { useEffect } from 'react';

// biome-ignore lint/suspicious/noShadowRestrictedNames: Next.js error boundary requires the component to be named Error
export default function Error({
    error: caughtError,
    reset: _reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(caughtError);
    }, [caughtError]);

    return (
        <Box asChild paddingInline="space-16" paddingBlock="space-32">
            <Page.Block width="md">
                <Heading level="1" size="medium" spacing>
                    Arbeidssøkerhistorikk
                </Heading>
                <ErrorSummary>
                    <ErrorSummary.Item>
                        Noe gikk galt når vi forsøkte å hente oversikten over tidligere arbeidsøkerperioder
                    </ErrorSummary.Item>
                </ErrorSummary>
            </Page.Block>
        </Box>
    );
}
