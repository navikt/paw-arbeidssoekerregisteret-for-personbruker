import { Loader } from '@navikt/ds-react';
import { Suspense } from 'react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';

import {
    fetchAggregertePerioder,
    fetchArbeidssoekerregisteretSnapshot,
    fetchTilgjengeligEgenvurdering,
} from '@/app/actions';
import PeriodeInfo from '@/components/min-situasjon/periode-info';
import { TilgjengeligBekreftelseLink } from '@/components/bekreftelse/tilgjengelig-bekreftelse-link';
import { fetchTilgjengeligeBekreftelser } from '@/app/bekreftelse/actions';
import { OpplysningerOppsummering } from '@/components/opplysninger/opplysninger-oppsummering';
import RegistrerArbeidssoker from '@/components/registrer-arbeidssoker/registrer-arbeidssoker';
import RegistrertTittel from '@/components/registrert-tittel/registrert-tittel';
import { NextPageProps } from '../../types/next';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import SettSprakIDekorator from '@/components/sett-sprak-i-dekorator';
import { SeHistorikkLenke } from '@/components/historikk/se-historikk-lenke';
import ManglerOpplysninger from '@/components/opplysninger/mangler-opplysninger';
import Feil from '@/components/feil';
import { hentInnloggingsNivaa } from '@/lib/hent-innloggings-nivaa';
import { BREADCRUMBS_TITLES, BREADCRUMBS_URLS } from '@/lib/breadcrumbs-tekster';
import Egenvurdering from '@/components/egenvurdering/egenvurdering';
import { fetchBrukerprofil } from '@/app/brukerprofil-api';
import StyrkEksperiment from '@/components/styrkløft/styrk-eksperiment';
import unleashKeys from '@/unleash-keys';
import { isEnabled } from '@/lib/unleash-is-enabled';
import StyrkloftSkyra from '@/components/skyra/styrkloft-skyra';
import VisWidgetForAktiveStyrkeloeftere from '@/components/ux-signals/vis-widget-for-aktive-styrkeloeftere';

interface Props {
    sprak: Sprak;
}

async function SamletInformasjonServerComponent({ sprak }: Props) {
    const { data: snapshotData, error: snapshotError } = await fetchArbeidssoekerregisteretSnapshot();

    const { data: innloggingsNivaa } = await hentInnloggingsNivaa();

    if (snapshotError) {
        return (
            <div className={'mb-6'}>
                <Feil sprak={sprak} error={snapshotError?.message} />
            </div>
        );
    }

    const harAktivPeriode = Boolean(snapshotData?.id) && !Boolean(snapshotData?.avsluttet);
    const harHistorikk = Boolean(snapshotData);

    return (
        <>
            <RegistrertTittel snapshot={snapshotData} sprak={sprak} />
            <PeriodeInfo snapshot={snapshotData} sprak={sprak} />
            <Suspense fallback={<Loader />}>
                <TilgjengeligBekreftelseKomponent sprak={sprak} />
            </Suspense>
            <Suspense fallback={<Loader />}>
                <EgenvurderingServerKomponent sprak={sprak} />
            </Suspense>
            {harAktivPeriode && (
                <Suspense>
                    <StyrkEksperimentServerKomponent sprak={sprak} />
                </Suspense>
            )}
            {harAktivPeriode && snapshotData?.opplysning && (
                <div className={'my-4'}>
                    <OpplysningerOppsummering
                        opplysninger={snapshotData.opplysning}
                        egenvurdering={snapshotData.egenvurdering}
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

const TilgjengeligBekreftelseKomponent = async ({ sprak }: Props) => {
    const { data, error } = await fetchTilgjengeligeBekreftelser();

    if (error) {
        return null;
    }

    return <TilgjengeligBekreftelseLink tilgjengeligeBekreftelser={data!} sprak={sprak} />;
};

const EgenvurderingServerKomponent = async ({ sprak }: Props) => {
    const { data } = await fetchTilgjengeligEgenvurdering();

    if (!data?.grunnlag) {
        return null;
    }

    return (
        <div className={'my-4'}>
            <Egenvurdering sprak={sprak} profilering={data.grunnlag} />
        </div>
    );
};

const StyrkEksperimentServerKomponent = async ({ sprak }: Props) => {
    const skalViseStyrkeloeft = await isEnabled(unleashKeys.VIS_STYRKELOEFT);
    const { data, error } = await fetchBrukerprofil();
    const erSkyraAktiv = await isEnabled(unleashKeys.BRUK_SKYRA);

    if (error || !data || !skalViseStyrkeloeft) {
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
            <div className={'mt-4'}>
                <StyrkEksperiment sprak={sprak} brukerprofil={data} />
            </div>
            <VisWidgetForAktiveStyrkeloeftere brukerprofil={data} />
        </>
    );
};

export default async function Home({ params }: NextPageProps) {
    const sprak = (await params).lang ?? 'nb';
    const title = lagHentTekstForSprak(BREADCRUMBS_TITLES, sprak);
    const url = lagHentTekstForSprak(BREADCRUMBS_URLS, sprak);

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
                <SamletInformasjonServerComponent sprak={sprak} />
            </Suspense>
        </main>
    );
}
