import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import type { Snapshot } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { Loader } from '@navikt/ds-react';
import { Suspense } from 'react';

import { fetchArbeidssoekerregisteretSnapshot, fetchTilgjengeligEgenvurdering } from '@/app/actions';
import { fetchTilgjengeligeBekreftelser } from '@/app/bekreftelse/actions';
import { fetchBrukerprofil, fetchLedigStillinger } from '@/app/brukerprofil-api';
import { TilgjengeligBekreftelseLink } from '@/components/bekreftelse/tilgjengelig-bekreftelse-link';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import Egenvurdering from '@/components/egenvurdering/egenvurdering';
import Feil from '@/components/feil';
import { SeHistorikkLenke } from '@/components/historikk/se-historikk-lenke';
import PeriodeInfo from '@/components/min-situasjon/periode-info';
import ManglerOpplysninger from '@/components/opplysninger/mangler-opplysninger';
import { OpplysningerOppsummering } from '@/components/opplysninger/opplysninger-oppsummering';
import RegistrerArbeidssoker from '@/components/registrer-arbeidssoker/registrer-arbeidssoker';
import RegistrertTittel from '@/components/registrert-tittel/registrert-tittel';
import SettSprakIDekorator from '@/components/sett-sprak-i-dekorator';
import StyrkloftSkyra from '@/components/skyra/styrkloft-skyra';
import StyrkWidget from '@/components/styrkløft/styrk-widget';
import { BREADCRUMBS_TITLES, BREADCRUMBS_URLS } from '@/lib/breadcrumbs-tekster';
import { hentInnloggingsNivaa } from '@/lib/hent-innloggings-nivaa';
import { isEnabled } from '@/lib/unleash-is-enabled';
import type { LedigeStillinger } from '@/model/brukerprofil';
import unleashKeys from '@/unleash-keys';
import type { NextPageProps } from '../../types/next';

interface Props {
    sprak: Sprak;
}

interface ForsideInnholdProps extends Props {
    snapshotPromise: ReturnType<typeof fetchArbeidssoekerregisteretSnapshot>;
    bekreftelserPromise: ReturnType<typeof fetchTilgjengeligeBekreftelser>;
    egenvurderingPromise: ReturnType<typeof fetchTilgjengeligEgenvurdering>;
    brukerprofilPromise: ReturnType<typeof fetchBrukerprofil>;
    skyraPromise: ReturnType<typeof isEnabled>;
    innloggingsNivaaPromise: ReturnType<typeof hentInnloggingsNivaa>;
}

/**
 * Tier 1: rendres så snart `snapshot` er løst, slik at LCP-elementet (tittelen) ikke gates på
 * tregere fetch-er. Resten av innholdet rendres atomisk i Tier 2 for å unngå at de conditional
 * boksene dytter innholdet under seg flere ganger (CLS).
 */
async function ForsideInnhold({
    sprak,
    snapshotPromise,
    bekreftelserPromise,
    egenvurderingPromise,
    brukerprofilPromise,
    skyraPromise,
    innloggingsNivaaPromise,
}: ForsideInnholdProps) {
    const { data: snapshotData, error: snapshotError } = await snapshotPromise;

    if (snapshotError) {
        return (
            <div className={'mb-6'}>
                <Feil sprak={sprak} error={snapshotError?.message} />
            </div>
        );
    }

    return (
        <>
            <RegistrertTittel snapshot={snapshotData} sprak={sprak} />
            <PeriodeInfo snapshot={snapshotData} sprak={sprak} />
            {/* Reserverer en stabil minimumshøyde mens Tier 2 strømmer inn, slik at footeren
                ikke hopper når den samlede innholdsblokken males. */}
            <Suspense fallback={<div className={'min-h-[320px]'} />}>
                <SamletRestInnhold
                    sprak={sprak}
                    snapshotData={snapshotData}
                    bekreftelserPromise={bekreftelserPromise}
                    egenvurderingPromise={egenvurderingPromise}
                    brukerprofilPromise={brukerprofilPromise}
                    skyraPromise={skyraPromise}
                    innloggingsNivaaPromise={innloggingsNivaaPromise}
                />
            </Suspense>
        </>
    );
}

interface SamletRestInnholdProps extends Props {
    snapshotData: Snapshot | undefined;
    bekreftelserPromise: ReturnType<typeof fetchTilgjengeligeBekreftelser>;
    egenvurderingPromise: ReturnType<typeof fetchTilgjengeligEgenvurdering>;
    brukerprofilPromise: ReturnType<typeof fetchBrukerprofil>;
    skyraPromise: ReturnType<typeof isEnabled>;
    innloggingsNivaaPromise: ReturnType<typeof hentInnloggingsNivaa>;
}

/**
 * Tier 2: venter på alle de allerede parallelt startede promisene og rendrer hele
 * innholdsblokken samtidig. Promisene løses til `{ data, error }` (kaster aldri), så
 * `Promise.all` er trygt og bevarer per-boks `null`/feil-håndtering.
 */
async function SamletRestInnhold({
    sprak,
    snapshotData,
    bekreftelserPromise,
    egenvurderingPromise,
    brukerprofilPromise,
    skyraPromise,
    innloggingsNivaaPromise,
}: SamletRestInnholdProps) {
    const [bekreftelser, egenvurdering, brukerprofil, erSkyraAktiv, { data: innloggingsNivaa }] = await Promise.all([
        bekreftelserPromise,
        egenvurderingPromise,
        brukerprofilPromise,
        skyraPromise,
        innloggingsNivaaPromise,
    ]);

    const harAktivPeriode = Boolean(snapshotData?.id) && !snapshotData?.avsluttet;
    const harHistorikk = Boolean(snapshotData);

    const visStyrkLoft = harAktivPeriode && !brukerprofil.error && Boolean(brukerprofil.data);
    // Hent ledige stillinger server-side kun når widgeten faktisk trenger dem (aktiv bruker),
    // og send dem inn som SWR fallbackData slik at lista rendres i endelig høyde allerede ved
    // SSR i stedet for å poppe inn etter hydrering (CLS).
    const skalHenteStillinger = visStyrkLoft && brukerprofil.data!.tjenestestatus === 'AKTIV';
    const ledigeStillinger: LedigeStillinger | undefined = skalHenteStillinger
        ? (await fetchLedigStillinger()).data
        : undefined;

    const tilgjengeligeBekreftelser = bekreftelser.error ? undefined : bekreftelser.data;

    return (
        <>
            {tilgjengeligeBekreftelser && (
                <TilgjengeligBekreftelseLink tilgjengeligeBekreftelser={tilgjengeligeBekreftelser} sprak={sprak} />
            )}
            {egenvurdering.data?.grunnlag && (
                <div className={'my-4'}>
                    <Egenvurdering sprak={sprak} profilering={egenvurdering.data.grunnlag} />
                </div>
            )}
            {visStyrkLoft && (
                <>
                    {erSkyraAktiv && (
                        <StyrkloftSkyra
                            brukerprofil={brukerprofil.data!}
                            slug={'arbeids-og-velferdsetaten-nav/styrkeloft-eksperimentavslutning'}
                        />
                    )}
                    <StyrkWidget sprak={sprak} brukerprofil={brukerprofil.data!} ledigeStillinger={ledigeStillinger} />
                </>
            )}
            {harAktivPeriode && snapshotData?.opplysning && (
                <div className={'my-4'}>
                    <OpplysningerOppsummering
                        snapshot={snapshotData}
                        sprak={sprak}
                        oppdaterOpplysningerUrl={process.env.OPPDATER_OPPLYSNINGER_URL!}
                        visEndreLink={innloggingsNivaa === 'idporten-loa-high'}
                    />
                </div>
            )}
            {harAktivPeriode && !snapshotData?.opplysning && (
                <div className={'my-4'}>
                    <ManglerOpplysninger
                        sprak={sprak}
                        oppdaterOpplysningerUrl={process.env.OPPDATER_OPPLYSNINGER_URL!}
                        visAdvarsel={innloggingsNivaa !== 'idporten-loa-high'}
                    />
                </div>
            )}
            {!harAktivPeriode && (
                <RegistrerArbeidssoker
                    className={'my-4'}
                    registrerArbeidssokerUrl={process.env.REGISTRER_ARBEIDSSOKER_URL!}
                    sprak={sprak}
                />
            )}
            {harHistorikk && <SeHistorikkLenke sprak={sprak} />}
        </>
    );
}

export default async function Home({ params }: NextPageProps) {
    const sprak = (await params).lang ?? 'nb';
    const title = lagHentTekstForSprak(BREADCRUMBS_TITLES, sprak);
    const url = lagHentTekstForSprak(BREADCRUMBS_URLS, sprak);

    // Start alle API-kall umiddelbart i parallel før await
    const snapshotPromise = fetchArbeidssoekerregisteretSnapshot();
    const bekreftelserPromise = fetchTilgjengeligeBekreftelser();
    const egenvurderingPromise = fetchTilgjengeligEgenvurdering();
    const brukerprofilPromise = fetchBrukerprofil();
    const skyraPromise = isEnabled(unleashKeys.BRUK_SKYRA);
    const innloggingsNivaaPromise = hentInnloggingsNivaa();

    return (
        <main className="flex flex-col max-w-3xl mx-auto px-4">
            <SettSprakIDekorator sprak={sprak} />
            <Breadcrumbs
                breadcrumbs={['minside', 'registeret'].map((key) => ({
                    title: title(key),
                    url: url(key),
                }))}
            />
            <Suspense fallback={<Loader />}>
                <ForsideInnhold
                    sprak={sprak}
                    snapshotPromise={snapshotPromise}
                    bekreftelserPromise={bekreftelserPromise}
                    egenvurderingPromise={egenvurderingPromise}
                    brukerprofilPromise={brukerprofilPromise}
                    skyraPromise={skyraPromise}
                    innloggingsNivaaPromise={innloggingsNivaaPromise}
                />
            </Suspense>
        </main>
    );
}
