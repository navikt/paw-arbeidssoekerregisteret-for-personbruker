import { Alert, Heading, Loader } from '@navikt/ds-react';
import { Suspense } from 'react';
import { Sprak, lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';

import { fetchAggregertePerioder, fetchBekreftelserMedStatus } from '@/app/actions';
import { NextPageProps } from '../../../types/next';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import SettSprakIDekorator from '@/components/sett-sprak-i-dekorator';
import { HistorikkWrapper } from '@/components/historikk/historikk-wrapper';

import { repackBekreftelserMedStatus } from '@/lib/repack-bekreftelser-med-status';
import { mergeGyldigeBekreftelser } from '@/lib/merge-gyldige-bekreftelser';

const TEKSTER = {
    nb: {
        tittel: 'Arbeidssøkerhistorikk',
    },
    nn: {
        tittel: 'Arbeidssøkjarhistorikk',
    },
    en: {
        tittel: 'Jobseeker history',
    }
};

async function HistorikkServerComponent({ sprak }: { sprak: Sprak }) {
    const { data: aggregertePerioder, error: aggregertError } = await fetchAggregertePerioder({});

    if (aggregertError) {
        return <Alert variant={'error'}>Noe gikk dessverre galt ved henting av historikk</Alert>;
    }

    const periodeids = aggregertePerioder?.map(periode => periode.periodeId as string) || []

    const { data: bekreftelserMedStatus, error: bekreftelserMedStatusError } = await fetchBekreftelserMedStatus({perioder: periodeids});

    if (bekreftelserMedStatusError) {
        return <Alert variant={'error'}>Noe gikk dessverre galt ved henting av historikk</Alert>;
    }

    const repakkedeBekreftelser = repackBekreftelserMedStatus(bekreftelserMedStatus?.bekreftelser || [])

    const aggregertePerioderMedGyldigeBekreftelser = aggregertePerioder ? mergeGyldigeBekreftelser(aggregertePerioder, repakkedeBekreftelser) : []

    return (
        <div className={'flex flex-col max-w-3xl mx-auto'}>
            {aggregertePerioder && aggregertePerioderMedGyldigeBekreftelser.map((periode, index) => (
                <div
                    className={'p-4'}
                    key={periode.periodeId}
                    style={{ background: index % 2 !== 0 ? 'var(--a-surface-subtle)' : undefined }}
                >
                    <HistorikkWrapper {...periode} sprak={sprak}/>
                </div>
            ))}
        </div>
    );
}

export default async function HistorikkPage({ params }: NextPageProps) {
    const sprak = (await params).lang ?? 'nb';
    const sprakUrl = sprak === 'nb' ? '' : `/${sprak}`;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <div className={'max-w-3xl mx-auto py-8'}>
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
            <Heading size="xlarge" level="1" className='p-4'>
                {tekst('tittel')}
            </Heading>
            <Suspense fallback={<Loader />}>
                <HistorikkServerComponent sprak={sprak} />
            </Suspense>
        </div>
    );
}
