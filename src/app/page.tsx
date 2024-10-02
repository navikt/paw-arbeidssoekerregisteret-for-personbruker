import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import { Suspense } from 'react';
import { fetchSisteSamletInformasjon } from './samletinformasjon/actions';

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
        <h1>Siste samlet informasjon</h1>
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
                paw-arbeidssoekerregisteret-for-personbruker
            </Heading>
          <div>
            <Heading level={'2'} size={'large'}>TODO:</Heading>
            <ul className={'list-disc'}>
              <li>implementer løsning</li>
            </ul>
          </div>
          <Suspense>
            <SamletInformasjonServerComponent />
          </Suspense>
        </main>
    );
}
