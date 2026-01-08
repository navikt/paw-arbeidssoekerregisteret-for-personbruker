import { Suspense } from 'react';
import { getPerioder } from './actions';
import { Heading, Loader } from '@navikt/ds-react';
import { Perioder } from '../../components/perioder/perioder';
import { ShowDetailsProvider } from '../../contexts/show-details-context';
import { VisDetaljerToggle } from '@/components/perioder/vis-detaljer-toggle';
import SettSprakIDekorator from '@/components/sett-sprak-i-dekorator';
import { NextPageProps } from '../../../types/next';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';

export const dynamic = 'force-dynamic';

const TEKSTER = {
    nb: {
        tittel: 'Arbeidssøkerhistorikk',
    },
    nn: {
        tittel: 'Arbeidssøkjarhistorikk',
    },
    en: {
        tittel: 'Jobseeker history',
    },
};

async function HistorikkServerComponent({ sprak }: { sprak: Sprak }) {
    const perioder = await getPerioder();

    return (
        <>
            <VisDetaljerToggle sprak={sprak} />
            <Perioder perioder={perioder} sprak={sprak} />
        </>
    );
}

export default async function HistorikkPage({ params }: NextPageProps) {
    const sprak = (await params).lang ?? 'nb';
    const sprakUrl = sprak === 'nb' ? '' : `/${sprak}`;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <div className={'max-w-3xl mx-auto py-8 px-4'}>
            <SettSprakIDekorator sprak={sprak} />
            <ShowDetailsProvider>
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
                <Heading level="1" size="medium" spacing>
                    {tekst('tittel')}
                </Heading>
                <Suspense
                    fallback={
                        <div className="text-center">
                            <Loader size="large" />
                        </div>
                    }
                >
                    <HistorikkServerComponent sprak={sprak} />
                </Suspense>
            </ShowDetailsProvider>
        </div>
    );
}
