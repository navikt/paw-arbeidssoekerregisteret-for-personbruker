import type { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { HStack, Loader } from '@navikt/ds-react';
import { Suspense } from 'react';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import SettSprakIDekorator from '@/components/sett-sprak-i-dekorator';
import { HistorikkInnhold, HistorikkSide } from '@/components/sider/historikkside';
import type { NextPageProps } from '../../../types/next';
import { getPerioder } from './actions';

export const dynamic = 'force-dynamic';

async function HistorikkServerComponent({ sprak }: { sprak: Sprak }) {
    const { perioder, error } = await getPerioder();

    return <HistorikkInnhold sprak={sprak} perioder={perioder} error={error} />;
}

export default async function HistorikkPage({ params }: NextPageProps) {
    const sprak = (await params).lang ?? 'nb';
    const sprakUrl = sprak === 'nb' ? '' : `/${sprak}`;

    return (
        <>
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
            <HistorikkSide sprak={sprak}>
                <Suspense
                    fallback={
                        <HStack justify="center">
                            <Loader size="large" />
                        </HStack>
                    }
                >
                    <HistorikkServerComponent sprak={sprak} />
                </Suspense>
            </HistorikkSide>
        </>
    );
}
