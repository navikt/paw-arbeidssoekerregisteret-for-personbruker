import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import { Suspense } from 'react';

import { fetchSisteSamletInformasjon, fetchBehovsvurdering } from '@/app/actions';

import RegistrertTittel from '@/components/registrert-tittel/registrert-tittel';
import PeriodeInfo from '@/components/min-situasjon/periode-info';

async function SamletInformasjonServerComponent() {
  const { data: sisteSamletInformasjon, error: errorSisteSamletInformasjon } = await fetchSisteSamletInformasjon();
  const { data: behovsvurdering, error: errorBehovsvurdering } = await fetchBehovsvurdering();

  if (errorSisteSamletInformasjon) {
      return (
        <>
          <Alert variant={'error'}>
            Noe gikk dessverre galt ved henting av siste samlede informasjon
          </Alert>
          <div>{errorSisteSamletInformasjon?.data}</div>
          <div>{errorSisteSamletInformasjon?.message}</div>
          <div>{errorSisteSamletInformasjon?.traceId}</div>
        </>
      );
  }

  if (errorBehovsvurdering) {
    return (
      <>
        <Alert variant={'error'}>
          Noe gikk dessverre galt ved henting av siste samlede informasjon
        </Alert>
        <div>{errorBehovsvurdering?.data}</div>
        <div>{errorBehovsvurdering?.message}</div>
        <div>{errorBehovsvurdering?.traceId}</div>
      </>
    );
}

  return (
      <>
        <RegistrertTittel {...sisteSamletInformasjon} sprak='nb'/>
        <PeriodeInfo {...sisteSamletInformasjon} sprak='nb' />
        <BodyLong>
          {JSON.stringify(sisteSamletInformasjon)}
        </BodyLong>
        <BodyLong>
          {JSON.stringify(behovsvurdering)}
        </BodyLong>
      </>
  );
}

export default function Home() {
    return (
        <main className="flex flex-col items-center">
            <Heading level={'1'} size={'xlarge'}>
                Arbeidssøkerregisteret
            </Heading>
            <Suspense>
              <SamletInformasjonServerComponent />
            </Suspense>
        </main>
    );
}
