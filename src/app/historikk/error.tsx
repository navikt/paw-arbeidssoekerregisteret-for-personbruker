'use client'; // Error boundaries must be Client Components

import { ErrorSummary, Heading } from '@navikt/ds-react';
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
        <div className={'max-w-3xl mx-auto py-8 px-4'}>
            <Heading level="1" size="medium" spacing>
                Arbeidssøkerhistorikk
            </Heading>
            <ErrorSummary>
                <ErrorSummary.Item>
                    Noe gikk galt når vi forsøkte å hente oversikten over tidligere arbeidsøkerperioder
                </ErrorSummary.Item>
            </ErrorSummary>
        </div>
    );
}
