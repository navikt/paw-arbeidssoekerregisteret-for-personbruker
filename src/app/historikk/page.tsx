import { Alert, Loader, Heading } from '@navikt/ds-react';
import { Suspense } from 'react';
import { SamletInformasjon, Sprak } from '@navikt/arbeidssokerregisteret-utils';

import { fetchSamletInformasjon } from '@/app/actions';
import { NextPageProps } from '../../../types/next';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import SettSprakIDekorator from '@/components/sett-sprak-i-dekorator';
import { byggSamletInformasjon } from '@/lib/bygg-samlet-informasjon.js';
import { HistorikkWrapper } from '@/components/historikk/historikk-wrapper';

async function HistorikkServerComponent({ sprak }: { sprak: Sprak }) {
    const { data: samletInformasjon, error: informasjonError } = await fetchSamletInformasjon({});
    const repakket = byggSamletInformasjon(samletInformasjon as SamletInformasjon)

    if (informasjonError) {
        return <Alert variant={'error'}>Noe gikk dessverre galt ved henting av historikk</Alert>;
    }

    return (
      <div className={'flex flex-col max-w-3xl mx-auto py-8'}>
          {repakket.map(periode => (<HistorikkWrapper key={periode.periodeId} {...periode} />))}
      </div>
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
            <Heading size='xlarge' level='1'>
              Arbeidssøkerhistorikk
            </Heading>
            <Suspense fallback={<Loader />}>
                <HistorikkServerComponent sprak={sprak} />
            </Suspense>
        </div>
    );
}
