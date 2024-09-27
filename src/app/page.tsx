import { Heading } from '@navikt/ds-react';

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
        </main>
    );
}
