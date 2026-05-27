import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Loader } from '@navikt/ds-react';
import { Suspense } from 'react';

import { fetchArbeidssoekerregisteretSnapshot, fetchTilgjengeligEgenvurdering } from '@/app/actions';
import { fetchTilgjengeligeBekreftelser } from '@/app/bekreftelse/actions';
import { fetchBrukerprofil } from '@/app/brukerprofil-api';
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
import unleashKeys from '@/unleash-keys';
import type { NextPageProps } from '../../types/next';

interface Props {
    sprak: Sprak;
}

interface SamletInformasjonProps extends Props {
    snapshotPromise: ReturnType<typeof fetchArbeidssoekerregisteretSnapshot>;
    bekreftelserPromise: ReturnType<typeof fetchTilgjengeligeBekreftelser>;
    egenvurderingPromise: ReturnType<typeof fetchTilgjengeligEgenvurdering>;
    brukerprofilPromise: ReturnType<typeof fetchBrukerprofil>;
    skyraPromise: ReturnType<typeof isEnabled>;
}

async function SamletInformasjonServerComponent({
    sprak,
    snapshotPromise,
    bekreftelserPromise,
    egenvurderingPromise,
    brukerprofilPromise,
    skyraPromise,
}: SamletInformasjonProps) {
    const [{ data: snapshotData, error: snapshotError }, { data: innloggingsNivaa }] = await Promise.all([
        snapshotPromise,
        hentInnloggingsNivaa(),
    ]);

    if (snapshotError) {
        return (
            <div className={'mb-6'}>
                <Feil sprak={sprak} error={snapshotError?.message} />
            </div>
        );
    }

    const harAktivPeriode = Boolean(snapshotData?.id) && !snapshotData?.avsluttet;
    const harHistorikk = Boolean(snapshotData);

    return (
        <>
            <RegistrertTittel snapshot={snapshotData} sprak={sprak} />
            <PeriodeInfo snapshot={snapshotData} sprak={sprak} />
            <Suspense fallback={<Loader />}>
                <TilgjengeligBekreftelseKomponent sprak={sprak} bekreftelserPromise={bekreftelserPromise} />
            </Suspense>
            <Suspense fallback={<Loader />}>
                <EgenvurderingServerKomponent sprak={sprak} egenvurderingPromise={egenvurderingPromise} />
            </Suspense>
            {harAktivPeriode && (
                <Suspense>
                    <StyrkLoftServerKomponent
                        sprak={sprak}
                        brukerprofilPromise={brukerprofilPromise}
                        skyraPromise={skyraPromise}
                    />
                </Suspense>
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

interface BekreftelseProps extends Props {
    bekreftelserPromise: ReturnType<typeof fetchTilgjengeligeBekreftelser>;
}

const TilgjengeligBekreftelseKomponent = async ({ sprak, bekreftelserPromise }: BekreftelseProps) => {
    const { data, error } = await bekreftelserPromise;

    if (error) {
        return null;
    }

    return <TilgjengeligBekreftelseLink tilgjengeligeBekreftelser={data!} sprak={sprak} />;
};

interface EgenvurderingProps extends Props {
    egenvurderingPromise: ReturnType<typeof fetchTilgjengeligEgenvurdering>;
}

const EgenvurderingServerKomponent = async ({ sprak, egenvurderingPromise }: EgenvurderingProps) => {
    const { data } = await egenvurderingPromise;

    if (!data?.grunnlag) {
        return null;
    }

    return (
        <div className={'my-4'}>
            <Egenvurdering sprak={sprak} profilering={data.grunnlag} />
        </div>
    );
};

interface StyrkLoftProps extends Props {
    brukerprofilPromise: ReturnType<typeof fetchBrukerprofil>;
    skyraPromise: ReturnType<typeof isEnabled>;
}

const StyrkLoftServerKomponent = async ({ sprak, brukerprofilPromise, skyraPromise }: StyrkLoftProps) => {
    const [{ data, error }, erSkyraAktiv] = await Promise.all([brukerprofilPromise, skyraPromise]);

    if (error || !data) {
        return null;
    }

    return (
        <>
            {erSkyraAktiv && (
                <StyrkloftSkyra
                    brukerprofil={data}
                    slug={'arbeids-og-velferdsetaten-nav/styrkeloft-eksperimentavslutning'}
                />
            )}
            <StyrkWidget sprak={sprak} brukerprofil={data} />
        </>
    );
};

export default async function Home({ params }: NextPageProps) {
    const sprak = (await params).lang ?? 'nb';
    const title = lagHentTekstForSprak(BREADCRUMBS_TITLES, sprak);
    const url = lagHentTekstForSprak(BREADCRUMBS_URLS, sprak);

    // Start all API fetches immediately in parallel before any await
    const snapshotPromise = fetchArbeidssoekerregisteretSnapshot();
    const bekreftelserPromise = fetchTilgjengeligeBekreftelser();
    const egenvurderingPromise = fetchTilgjengeligEgenvurdering();
    const brukerprofilPromise = fetchBrukerprofil();
    const skyraPromise = isEnabled(unleashKeys.BRUK_SKYRA);

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
                <SamletInformasjonServerComponent
                    sprak={sprak}
                    snapshotPromise={snapshotPromise}
                    bekreftelserPromise={bekreftelserPromise}
                    egenvurderingPromise={egenvurderingPromise}
                    brukerprofilPromise={brukerprofilPromise}
                    skyraPromise={skyraPromise}
                />
            </Suspense>
        </main>
    );
}
