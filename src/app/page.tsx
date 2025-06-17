import { Loader } from '@navikt/ds-react';
import { Suspense } from 'react';
import { hentSisteProfilering, lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';

import { fetchSamletInformasjon, fetchTilgjengeligEgenvurdering } from '@/app/actions';
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

interface Props {
    sprak: Sprak;
}

async function SamletInformasjonServerComponent({ sprak }: Props) {
    const { data: sisteSamletInformasjon, error: errorSisteSamletInformasjon } = await fetchSamletInformasjon({
        visKunSisteInformasjon: true,
    });

    const { data: innloggingsNivaa } = await hentInnloggingsNivaa();

    const opplysninger = sisteSamletInformasjon?.opplysningerOmArbeidssoeker[0];
    const harAktivPeriode = sisteSamletInformasjon?.arbeidssoekerperioder[0]?.avsluttet === null;
    const harHistorikk = (sisteSamletInformasjon?.arbeidssoekerperioder.length as any) > 0;

    if (errorSisteSamletInformasjon) {
        return (
            <div className={'mb-6'}>
                <Feil sprak={sprak} error={errorSisteSamletInformasjon?.message} />
            </div>
        );
    }

    return (
        <>
            <RegistrertTittel {...sisteSamletInformasjon!} sprak={sprak} />
            <PeriodeInfo {...sisteSamletInformasjon!} sprak={sprak} />
            <Suspense fallback={<Loader />}>
                <TilgjengeligBekreftelseKomponent sprak={sprak} />
            </Suspense>
            <Suspense fallback={<Loader />}>
                <EgenvurderingServerKomponent sprak={sprak} />
            </Suspense>
            {harAktivPeriode && opplysninger && (
                <div className={'my-6'}>
                    <OpplysningerOppsummering
                        opplysninger={opplysninger}
                        sprak={sprak}
                        oppdaterOpplysningerUrl={process.env.OPPDATER_OPPLYSNINGER_URL!}
                        visEndreLink={innloggingsNivaa === 'idporten-loa-high'}
                    />
                </div>
            )}
            {harAktivPeriode && !opplysninger && (
                <div className={'my-6'}>
                    <ManglerOpplysninger
                        sprak={sprak}
                        oppdaterOpplysningerUrl={process.env.OPPDATER_OPPLYSNINGER_URL!}
                        visAdvarsel={innloggingsNivaa !== 'idporten-loa-high'}
                    />
                </div>
            )}
            {!harAktivPeriode && (
                <RegistrerArbeidssoker
                    className={'my-6'}
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

    return <Egenvurdering sprak={sprak} profilering={data.grunnlag} />;
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
