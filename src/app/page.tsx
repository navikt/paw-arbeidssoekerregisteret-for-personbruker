import { Alert, Loader } from '@navikt/ds-react';
import { Suspense } from 'react';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';

import { fetchBehovsvurdering, fetchSamletInformasjon } from '@/app/actions';
import PeriodeInfo from '@/components/min-situasjon/periode-info';
import { TilgjengeligBekreftelseLink } from '@/components/bekreftelse/tilgjengelig-bekreftelse-link';
import { fetchTilgjengeligeBekreftelser } from '@/app/bekreftelse/actions';
import { OpplysningerOppsummering } from '@/components/opplysninger/opplysninger-oppsummering';
import RegistrerArbeidssoker from '@/components/registrer-arbeidssoker/registrer-arbeidssoker';
import RegistrertTittel from '@/components/registrert-tittel/registrert-tittel';
import { NextPageProps } from '../../types/next';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import SettSprakIDekorator from '@/components/sett-sprak-i-dekorator';

interface Props {
    sprak: Sprak;
}

async function SamletInformasjonServerComponent({ sprak }: Props) {
    const { data: sisteSamletInformasjon, error: errorSisteSamletInformasjon } = await fetchSamletInformasjon({
        visKunSisteInformasjon: true,
    });
    const { data: behovsvurdering, error: errorBehovsvurdering } = await fetchBehovsvurdering();
    const opplysninger = sisteSamletInformasjon?.opplysningerOmArbeidssoeker[0];
    const harAktivPeriode = sisteSamletInformasjon?.arbeidssoekerperioder[0]?.avsluttet === null;

    if (errorSisteSamletInformasjon) {
        return (
            <>
                <Alert variant={'error'}>Noe gikk dessverre galt ved henting av siste samlede informasjon</Alert>
                <div>{errorSisteSamletInformasjon?.data}</div>
                <div>{errorSisteSamletInformasjon?.message}</div>
                <div>{errorSisteSamletInformasjon?.traceId}</div>
            </>
        );
    }

    if (errorBehovsvurdering) {
        return (
            <>
                <Alert variant={'error'}>Noe gikk dessverre galt ved henting av siste samlede informasjon</Alert>
                <div>{errorBehovsvurdering?.data}</div>
                <div>{errorBehovsvurdering?.message}</div>
                <div>{errorBehovsvurdering?.traceId}</div>
            </>
        );
    }

    return (
        <>
            <RegistrertTittel {...sisteSamletInformasjon!} sprak={sprak} />
            <PeriodeInfo {...sisteSamletInformasjon!} sprak={sprak} />
            <Suspense fallback={<Loader />}>
                <TilgjengeligBekreftelseKomponent sprak={sprak} />
            </Suspense>
            {harAktivPeriode && opplysninger && (
                <div className={'my-6'}>
                    <OpplysningerOppsummering
                        opplysninger={opplysninger}
                        sprak={sprak}
                        behovsvurdering={behovsvurdering}
                        harAktivPeriode={harAktivPeriode}
                        oppdaterOpplysningerUrl={process.env.OPPDATER_OPPLYSNINGER_URL!}
                    />
                </div>
            )}
            {!harAktivPeriode && (
                <RegistrerArbeidssoker
                    className={'my-6'}
                    registrerArbeidssokerUrl={process.env.REGISTRER_ARBEIDSSOKER_URL!}
                />
            )}
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

export default function Home({ params }: NextPageProps) {
    const sprak = params.lang ?? 'nb';
    const sprakUrl = sprak === 'nb' ? '' : `/${sprak}`;

    return (
        <main className="flex flex-col max-w-3xl mx-auto px-4">
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
                ]}
            />
            <Suspense fallback={<Loader />}>
                <SamletInformasjonServerComponent sprak={sprak} />
            </Suspense>
        </main>
    );
}
