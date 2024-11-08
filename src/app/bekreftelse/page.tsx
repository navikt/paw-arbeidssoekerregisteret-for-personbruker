import { Alert, Heading, Loader } from '@navikt/ds-react';
import { fetchTilgjengeligeBekreftelser } from '@/app/bekreftelse/actions';
import { Suspense } from 'react';
import BekreftelseWrapper from '@/components/bekreftelse/bekreftelse-wrapper';
import { fetchSisteSamletInformasjon } from '@/app/actions';
import { hentSisteArbeidssokerPeriode, lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { NextPageProps } from '../../../types/next';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import SettSprakIDekorator from '@/components/sett-sprak-i-dekorator';

async function BekreftelseServerComponent({ sprak }: { sprak: Sprak }) {
    const { data: tilgjengeligeBekreftelser, error } = await fetchTilgjengeligeBekreftelser();
    const { data: samletInformasjon, error: informasjonError } = await fetchSisteSamletInformasjon();

    if (error || informasjonError) {
        return <Alert variant={'error'}>Noe gikk dessverre galt</Alert>;
    }

    const sisteArbeidssokerPeriode = hentSisteArbeidssokerPeriode(samletInformasjon?.arbeidssoekerperioder ?? []);
    const erAktivArbeidssoker = !Boolean(sisteArbeidssokerPeriode?.avsluttet);
    const sistInnsendteBekreftelse = samletInformasjon?.bekreftelser[0];

    return (
        <BekreftelseWrapper
            sprak={sprak}
            erAktivArbeidssoker={erAktivArbeidssoker}
            tilgjengeligeBekreftelser={tilgjengeligeBekreftelser}
            sistInnsendteBekreftelse={sistInnsendteBekreftelse}
        />
    );
}
const TEKSTER = {
    nb: {
        heading: 'Bekreftelse',
    },
};

export default async function BekreftelsePage({ params }: NextPageProps) {
    const sprak = params.lang ?? 'nb';
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const sprakUrl = sprak === 'nb' ? '' : `/${sprak}`;

    return (
        <div className={'flex flex-col items-center py-8'}>
            <Heading size={'large'} level={'1'}>
                {tekst('heading')}
            </Heading>
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
                        title: 'Bekreftelse',
                        url: `${sprakUrl}/bekreftelse`,
                    },
                ]}
            />
            <Suspense fallback={<Loader />}>
                <BekreftelseServerComponent sprak={sprak} />
            </Suspense>
        </div>
    );
}
