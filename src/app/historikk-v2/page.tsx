import { Suspense } from 'react';
import { getPerioder } from './actions';
import { Heading, Loader } from '@navikt/ds-react';
import { Perioder } from '../../components/perioder/perioder';

export const dynamic = 'force-dynamic';

async function HistorikkServerComponent() {
    const perioder = await getPerioder();

    return (
        <div>
            <Perioder perioder={perioder} />
        </div>
    );
}

export default async function HistorikkPage() {
    return (
        <div className={'max-w-3xl mx-auto py-8 px-4'}>
            <Heading level="1" size="medium" spacing>
                Arbeidssøkerhistorikk
            </Heading>
            <Suspense
                fallback={
                    <div className="text-center">
                        <Loader size="large" />
                    </div>
                }
            >
                <HistorikkServerComponent />
            </Suspense>
        </div>
    );
}
