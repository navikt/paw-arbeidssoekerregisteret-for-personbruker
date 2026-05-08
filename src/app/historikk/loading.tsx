import { Loader } from '@navikt/ds-react';

export default function Loading() {
    return (
        <div className="max-w-3xl mx-auto py-8 px-4 text-center">
            <Loader size="large" title="Laster innhold..." />
        </div>
    );
}
