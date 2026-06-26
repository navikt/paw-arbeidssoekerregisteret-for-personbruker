import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Loader } from '@navikt/ds-react';
import { Suspense } from 'react';
import { fetchArbeidssoekerregisteretSnapshot } from '@/app/actions';
import { fetchTilgjengeligeBekreftelser } from '@/app/bekreftelse/actions';
import { fetchBrukerprofil } from '@/app/brukerprofil-api';
import BekreftelseWrapper from '@/components/bekreftelse/bekreftelse-wrapper';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import Feil from '@/components/feil';
import SettSprakIDekorator from '@/components/sett-sprak-i-dekorator';
import { BREADCRUMBS_TITLES, BREADCRUMBS_URLS } from '@/lib/breadcrumbs-tekster';
import { leggSprakTilEksternUrl } from '@/lib/sprak-avhengig-url';
import type { NextPageProps } from '../../../types/next';

interface BekreftelseServerComponentProps {
    sprak: Sprak;
    bekreftelserPromise: ReturnType<typeof fetchTilgjengeligeBekreftelser>;
    snapshotPromise: ReturnType<typeof fetchArbeidssoekerregisteretSnapshot>;
    brukerprofilPromise: ReturnType<typeof fetchBrukerprofil>;
}

async function BekreftelseServerComponent({
    sprak,
    bekreftelserPromise,
    snapshotPromise,
    brukerprofilPromise,
}: BekreftelseServerComponentProps) {
    const [{ data: tilgjengeligeBekreftelser, error }, { data: snapshotData, error: snapshotError }] =
        await Promise.all([bekreftelserPromise, snapshotPromise]);

    if (error || snapshotError) {
        return <Feil sprak={sprak} error={error?.message ?? snapshotError?.message ?? ''} />;
    }
    const erAktivArbeidssoker = Boolean(snapshotData?.id) && !snapshotData?.avsluttet;
    const sistInnsendteBekreftelse = snapshotData?.bekreftelse;

    const brukerprofil = erAktivArbeidssoker ? (await brukerprofilPromise).data : undefined;

    return (
        <BekreftelseWrapper
            sprak={sprak}
            erAktivArbeidssoker={erAktivArbeidssoker}
            tilgjengeligeBekreftelser={tilgjengeligeBekreftelser}
            sistInnsendteBekreftelse={sistInnsendteBekreftelse}
            registrerArbeidssokerUrl={leggSprakTilEksternUrl(process.env.REGISTRER_ARBEIDSSOKER_URL!, sprak)}
            brukerprofil={brukerprofil}
        />
    );
}

export default async function BekreftelsePage({ params }: NextPageProps) {
    const sprak = (await params).lang ?? 'nb';
    const title = lagHentTekstForSprak(BREADCRUMBS_TITLES, sprak);
    const url = lagHentTekstForSprak(BREADCRUMBS_URLS, sprak);

    // Start alle fetches umiddelbart i parallell
    const bekreftelserPromise = fetchTilgjengeligeBekreftelser();
    const snapshotPromise = fetchArbeidssoekerregisteretSnapshot();
    const brukerprofilPromise = fetchBrukerprofil();

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
                <BekreftelseServerComponent
                    sprak={sprak}
                    bekreftelserPromise={bekreftelserPromise}
                    snapshotPromise={snapshotPromise}
                    brukerprofilPromise={brukerprofilPromise}
                />
            </Suspense>
        </div>
    );
}
