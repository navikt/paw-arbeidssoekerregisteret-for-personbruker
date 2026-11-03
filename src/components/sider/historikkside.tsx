import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import type { Periode } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { Heading } from '@navikt/ds-react';
import type { ReactNode } from 'react';
import { Perioder } from '@/components/perioder/perioder';
import { PerioderFeilmelding } from '@/components/perioder/perioder-feilmelding';
import { PerioderTom } from '@/components/perioder/perioder-tom';
import { VisDetaljerToggle } from '@/components/perioder/vis-detaljer-toggle';
import { ShowDetailsProvider } from '@/contexts/show-details-context';

const TEKSTER = {
    nb: {
        tittel: 'Arbeidssøkerhistorikk',
    },
    nn: {
        tittel: 'Arbeidssøkjarhistorikk',
    },
    en: {
        tittel: 'Jobseeker history',
    },
};

interface HistorikkSideProps {
    sprak: Sprak;
    children: ReactNode;
}

interface HistorikkInnholdProps {
    sprak: Sprak;
    perioder: Periode[] | null;
    error?: Error;
}

function HistorikkSide({ sprak, children }: HistorikkSideProps) {
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <Heading level="1" size="medium" spacing>
                {tekst('tittel')}
            </Heading>
            {children}
        </div>
    );
}

function HistorikkInnhold({ sprak, perioder, error }: HistorikkInnholdProps) {
    return (
        <ShowDetailsProvider>
            {error ? (
                <PerioderFeilmelding sprak={sprak} />
            ) : !perioder || perioder.length === 0 ? (
                <PerioderTom sprak={sprak} />
            ) : (
                <>
                    <VisDetaljerToggle sprak={sprak} />
                    <Perioder perioder={perioder} sprak={sprak} />
                </>
            )}
        </ShowDetailsProvider>
    );
}

export { HistorikkInnhold, HistorikkSide };
