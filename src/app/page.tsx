import { Alert, Heading, Loader } from '@navikt/ds-react';
import { Suspense } from 'react';

import { fetchBehovsvurdering, fetchSisteSamletInformasjon } from '@/app/actions';
import PeriodeInfo from '@/components/min-situasjon/periode-info';
import { TilgjengeligBekreftelseLink } from '@/components/bekreftelse/tilgjengelig-bekreftelse-link';
import { fetchTilgjengeligeBekreftelser } from '@/app/bekreftelse/actions';
import { OpplysningerOppsummering } from '@/components/opplysninger/opplysninger-oppsummering';
import RegistrerArbeidssoker from '@/components/registrer-arbeidssoker/registrer-arbeidssoker';

async function SamletInformasjonServerComponent() {
    const { data: sisteSamletInformasjon, error: errorSisteSamletInformasjon } = await fetchSisteSamletInformasjon();
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

    console.log('sisteSamletInformasjon', sisteSamletInformasjon);
    console.log('behovsvurdering', behovsvurdering);

    return (
        <>
            {/*<RegistrertTittel {...sisteSamletInformasjon!} sprak="nb" />*/}
            <PeriodeInfo {...sisteSamletInformasjon!} sprak="nb" />
            <Suspense fallback={<Loader />}>
                <TilgjengeligBekreftelseKomponent />
            </Suspense>
            {harAktivPeriode && opplysninger && (
                <div className={'my-6'}>
                    <OpplysningerOppsummering
                        opplysninger={opplysninger}
                        sprak={'nb'}
                        behovsvurdering={behovsvurdering}
                        harAktivPeriode={harAktivPeriode}
                    />
                </div>
            )}
            {!harAktivPeriode && <RegistrerArbeidssoker className={'my-6'}/>}
        </>
    );
}

const TilgjengeligBekreftelseKomponent = async () => {
    const { data, error } = await fetchTilgjengeligeBekreftelser();

    if (error) {
        return null;
    }

    return <TilgjengeligBekreftelseLink tilgjengeligeBekreftelser={data!} sprak={'nb'} />;
};

export default function Home() {
    return (
        <main className="flex flex-col items-center px-4">
            <Heading level={'1'} size={'xlarge'}>
                Arbeidssøkerregisteret
            </Heading>
            <Suspense fallback={<Loader />}>
                <SamletInformasjonServerComponent />
            </Suspense>
        </main>
    );
}
