import { Loader } from '@navikt/ds-react';
import { fetchTilgjengeligeBekreftelser } from '@/app/bekreftelse/actions';
import { Suspense } from 'react';
import BekreftelseWrapper from '@/components/bekreftelse/bekreftelse-wrapper';
import { fetchAggregertePerioder } from '@/app/actions';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { NextPageProps } from '../../../types/next';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import SettSprakIDekorator from '@/components/sett-sprak-i-dekorator';
import Feil from '@/components/feil';
import { BREADCRUMBS_TITLES, BREADCRUMBS_URLS } from '@/lib/breadcrumbs-tekster';

async function BekreftelseServerComponent({ sprak }: { sprak: Sprak }) {
    const { data: tilgjengeligeBekreftelser, error } = await fetchTilgjengeligeBekreftelser();
    const { data: aggregertePerioder, error: aggregertePerioderError } = await fetchAggregertePerioder({
        visKunSisteInformasjon: true,
    });

    if (error || aggregertePerioderError) {
        return <Feil sprak={sprak} error={error?.message ?? aggregertePerioderError?.message ?? ''} />;
    }
    const sisteInformasjon = aggregertePerioder && aggregertePerioder[0];
    const erAktivArbeidssoker = Boolean(sisteInformasjon?.periodeId) && !Boolean(sisteInformasjon?.avsluttet);
    const sistInnsendteBekreftelse = sisteInformasjon?.bekreftelser[0];

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
    const title = lagHentTekstForSprak(BREADCRUMBS_TITLES, sprak);
    const url = lagHentTekstForSprak(BREADCRUMBS_URLS, sprak);

    return (
        <div className={'flex flex-col max-w-3xl mx-auto py-8'}>
            <SettSprakIDekorator sprak={sprak} />
            <Breadcrumbs
                breadcrumbs={['minside', 'registeret', 'bekreftelse'].map((key) => ({
                    title: title(key),
                    url: url(key),
                }))}
            />
            <Suspense fallback={<Loader />}>
                <BekreftelseServerComponent sprak={sprak} />
            </Suspense>
        </div>
    );
}
