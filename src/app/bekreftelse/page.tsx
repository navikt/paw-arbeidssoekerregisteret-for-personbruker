import { Loader } from '@navikt/ds-react';
import { fetchTilgjengeligeBekreftelser } from '@/app/bekreftelse/actions';
import { Suspense } from 'react';
import BekreftelseWrapper from '@/components/bekreftelse/bekreftelse-wrapper';
import { fetchArbeidssoekerregisteretSnapshot } from '@/app/actions';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { NextPageProps } from '../../../types/next';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import SettSprakIDekorator from '@/components/sett-sprak-i-dekorator';
import Feil from '@/components/feil';
import { BREADCRUMBS_TITLES, BREADCRUMBS_URLS } from '@/lib/breadcrumbs-tekster';
import { fetchBrukerprofil } from '@/app/brukerprofil-api';
import { isEnabled } from '@/lib/unleash-is-enabled';
import unleashKeys from '@/unleash-keys';

async function BekreftelseServerComponent({ sprak }: { sprak: Sprak }) {
    const { data: tilgjengeligeBekreftelser, error } = await fetchTilgjengeligeBekreftelser();
    const { data: snapshotData, error: snapshotError } = await fetchArbeidssoekerregisteretSnapshot();

    if (error || snapshotError) {
        return <Feil sprak={sprak} error={error?.message ?? snapshotError?.message ?? ''} />;
    }
    const erAktivArbeidssoker = Boolean(snapshotData?.id) && !Boolean(snapshotData?.avsluttet);
    const sistInnsendteBekreftelse = snapshotData?.bekreftelse;

    const skalViseStyrkeloeft = await isEnabled(unleashKeys.VIS_STYRKELOEFT);
    let brukerprofil;

    if (erAktivArbeidssoker && skalViseStyrkeloeft) {
        brukerprofil = (await fetchBrukerprofil()).data;
    }

    return (
        <BekreftelseWrapper
            sprak={sprak}
            erAktivArbeidssoker={erAktivArbeidssoker}
            tilgjengeligeBekreftelser={tilgjengeligeBekreftelser}
            sistInnsendteBekreftelse={sistInnsendteBekreftelse}
            registrerArbeidssokerUrl={process.env.REGISTRER_ARBEIDSSOKER_URL!}
            brukerprofil={brukerprofil}
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
