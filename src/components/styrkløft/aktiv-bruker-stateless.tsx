import { Box, Heading, Loader } from '@navikt/ds-react';
import { FlerValgsMeny } from '@/components/styrkløft/flervalgsmeny';
import LedigeStillinger from '@/components/styrkløft/ledige-stillinger';
import VelgStillingssoek from '@/components/styrkløft/velg-stillingssoek';
import { Suspense } from 'react';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { BekreftAvmelding } from '@/components/styrkløft/bekreft-avmelding';
import { Brukerprofil, Tjenestestatus } from '@/model/brukerprofil';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { loggStyrkeloft } from '@/lib/tracking';

interface Props {
    brukerprofil: Brukerprofil;
    sprak: Sprak;
    useOnFetchStillinger(): { data?: any; error?: Error };
    onSubmitTjenestestatus(status: Tjenestestatus): Promise<void>;
    onSubmitStillingsSoek(data: any): Promise<void>;
    visEndreSok: boolean;
    visAvmeldModal: boolean;
    onEditSearch: () => void;
    onCancelEditSearch?: () => void;
    lagretSok: {
        fylker: string[];
        yrkeskategorier: string[];
    };
    onVisAvmeldModal: (val: boolean) => void;
    submittedTjenestestatus?: Tjenestestatus | null;
    pendingTjenestestatus?: Tjenestestatus | null;
    errorTjenestestatus?: string | null;
}

const TEKSTER = {
    nb: {
        heading: 'Ledige stillinger',
        nyhet: 'Nå kan du også filtrere på kommuner i stillingssøket',
    },
    nn: {
        heading: 'Ledige stillingar',
        nyhet: 'No kan du også filtrere på kommunar i stillingssøket',
    },
    en: {
        heading: 'Vacant jobs',
        nyhet: 'You can now also filter by municipality in the job search',
    },
};

function AktivBrukerStateless(props: Props) {
    const {
        sprak,
        visEndreSok,
        visAvmeldModal,
        lagretSok,
        onSubmitStillingsSoek,
        onEditSearch,
        onCancelEditSearch,
        onVisAvmeldModal,
        onSubmitTjenestestatus,
        pendingTjenestestatus,
        errorTjenestestatus,
        brukerprofil,
    } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    const kanSeDirektemeldteStillinger = (brukerprofil.flagg ?? []).some(
        (flagg) => flagg.navn === 'DIREKTEMELDTE_STILLINGER',
    );

    return (
        <Box className={'py-4 px-6'} borderRadius="8" borderColor={'neutral-subtle'} borderWidth={'1'}>
            <div className={'flex justify-between'}>
                <Heading size={'medium'} level={'3'} className={'mb-4'}>
                    {tekst('heading')}
                </Heading>
                <FlerValgsMeny
                    disabledEditSearch={visEndreSok}
                    onEditSearch={onEditSearch}
                    onEnd={() => onVisAvmeldModal(true)}
                    sprak={sprak}
                />
            </div>
            {!visEndreSok && (
                <ErrorBoundary errorComponent={() => null}>
                    <Suspense fallback={<Loader />}>
                        <LedigeStillinger
                            key={`${lagretSok.fylker.join(',')}-${lagretSok.yrkeskategorier.join(',')}`}
                            useOnFetchData={props.useOnFetchStillinger}
                            sprak={sprak}
                            kanSeDirektemeldteStillinger={kanSeDirektemeldteStillinger}
                        />
                    </Suspense>
                </ErrorBoundary>
            )}
            {visEndreSok && (
                <VelgStillingssoek
                    sprak={sprak}
                    fylker={lagretSok.fylker}
                    yrkeskategorier={lagretSok.yrkeskategorier}
                    onSubmit={onSubmitStillingsSoek}
                    onCancel={onCancelEditSearch}
                />
            )}
            {visAvmeldModal && (
                <BekreftAvmelding
                    open={visAvmeldModal}
                    onConfirm={() => onSubmitTjenestestatus('OPT_OUT')}
                    onClose={() => {
                        loggStyrkeloft({ aktivitet: 'Avbryter avslutning av eksperiment' });
                        return onVisAvmeldModal(false);
                    }}
                    sprak={sprak}
                    pending={Boolean(pendingTjenestestatus)}
                    error={Boolean(errorTjenestestatus)}
                />
            )}
        </Box>
    );
}

export default AktivBrukerStateless;
