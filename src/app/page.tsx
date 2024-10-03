import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import { Suspense } from 'react';

import { fetchSisteSamletInformasjon } from '@/app/actions';

import RegistrertTittel from '@/components/registrert-tittel/registrert-tittel';

async function SamletInformasjonServerComponent() {
  const { data: sisteSamletInformasjon, error } = await fetchSisteSamletInformasjon();

  if (error) {
      return (
        <>
          <Alert variant={'error'}>
            Noe gikk dessverre galt ved henting av siste samlede informasjon
          </Alert>
          <div>{error?.data}</div>
          <div>{error?.message}</div>
          <div>{error?.traceId}</div>
        </>
      );
  }

  return (
      <>
        <RegistrertTittel {...sisteSamletInformasjon} sprak='nb'/>
        <BodyLong>
          { JSON.stringify(sisteSamletInformasjon)}
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
