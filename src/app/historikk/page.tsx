import { Alert, Loader } from '@navikt/ds-react';
import { Suspense } from 'react';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';

import { fetchSisteSamletInformasjon } from '@/app/actions';
import { NextPageProps } from '../../../types/next';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import SettSprakIDekorator from '@/components/sett-sprak-i-dekorator';

async function HistorikkServerComponent({ sprak }: { sprak: Sprak }) {
    const { data: samletInformasjon, error: informasjonError } = await fetchSisteSamletInformasjon();

    if (informasjonError) {
        return <Alert variant={'error'}>Noe gikk dessverre galt ved henting av historikk</Alert>;
    }

    return (
        <pre>{JSON.stringify(samletInformasjon, null, 2)}</pre>
    );
}

export default async function HistorikkPage({ params }: NextPageProps) {
    const sprak = params.lang ?? 'nb';
    const sprakUrl = sprak === 'nb' ? '' : `/${sprak}`;

    return (
        <div className={'flex flex-col max-w-3xl mx-auto py-8'}>
            <SettSprakIDekorator sprak={sprak} />
            <Breadcrumbs
                breadcrumbs={[
                    {
                        title: 'Min side',
                        url: `/minside${sprakUrl}`,
                    },
                    {
                        title: 'Arbeidssøkerregisteret',
                        url: `/arbeidssoekerregisteret${sprakUrl}`,
                    },
                    {
                      title: 'Historikk',
                      url: `${sprakUrl}/historikk`,
                  },
                ]}
            />
            <Suspense fallback={<Loader />}>
                <HistorikkServerComponent sprak={sprak} />
            </Suspense>
        </div>
    );
}
