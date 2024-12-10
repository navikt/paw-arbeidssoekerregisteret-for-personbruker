import { Alert, Loader } from '@navikt/ds-react';
import { fetchTilgjengeligeBekreftelser } from '@/app/bekreftelse/actions';
import { Suspense } from 'react';
import BekreftelseWrapper from '@/components/bekreftelse/bekreftelse-wrapper';
import { fetchSamletInformasjon } from '@/app/actions';
import { hentSisteArbeidssokerPeriode, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { NextPageProps } from '../../../types/next';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import SettSprakIDekorator from '@/components/sett-sprak-i-dekorator';
import Feil from '@/components/feil';

async function BekreftelseServerComponent({ sprak }: { sprak: Sprak }) {
    const { data: tilgjengeligeBekreftelser, error } = await fetchTilgjengeligeBekreftelser();
    const { data: samletInformasjon, error: informasjonError } = await fetchSamletInformasjon({
        visKunSisteInformasjon: true,
    });

    if (error || informasjonError) {
        return <Feil sprak={sprak} error={error?.message ?? informasjonError?.message ?? ''} />;
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
            registrerArbeidssokerUrl={process.env.REGISTRER_ARBEIDSSOKER_URL!}
        />
    );
}

export default async function BekreftelsePage({ params }: NextPageProps) {
    const sprak = (await params).lang ?? 'nb';
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
