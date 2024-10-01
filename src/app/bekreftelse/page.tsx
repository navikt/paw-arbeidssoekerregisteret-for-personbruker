import { Alert, Heading, Page } from '@navikt/ds-react';
import { fetchTilgjengeligeBekreftelser } from '@/app/bekreftelse/actions';
import { Suspense } from 'react';
import BekreftelseWrapper from '@/components/bekreftelse/BekreftelseWrapper';

async function BekreftelseServerComponent() {
    const { data: tilgjengeligeBekreftelser, error } = await fetchTilgjengeligeBekreftelser();

    if (error) {
        return <Alert variant={'error'}>Noe gikk dessverre galt</Alert>;
    }

    return (
        <BekreftelseWrapper
            sprak={'nb'}
            erAktivArbeidssoker={true}
            tilgjengeligeBekreftelser={tilgjengeligeBekreftelser}
        />
    );
}

export default async function BekreftelsePage() {
    return (
        <div className={'flex flex-col items-center py-8'}>
            <Heading size={'large'} level={'1'}>
                Bekreftelse
            </Heading>
            <Suspense>
                <BekreftelseServerComponent />
            </Suspense>
        </div>
    );
}
