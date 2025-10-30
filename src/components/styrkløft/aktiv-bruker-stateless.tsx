import { Box, Heading, Loader } from '@navikt/ds-react';
import { FlerValgsMeny } from '@/components/styrkløft/flervalgsmeny';
import LedigeStillinger from '@/components/styrkløft/ledige-stillinger';
import { AktivBrukerProps } from '@/components/styrkløft/aktiv-bruker';
import VelgStillingssoek from '@/components/styrkløft/velg-stillingssoek';
import { Suspense } from 'react';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { BekreftAvmelding } from '@/components/styrkløft/bekreft-avmelding';

interface Props extends AktivBrukerProps {
    isEditMode: boolean;
    visAvmeldModal: boolean;
    onEditSearch: () => void;
    onCancelEditSearch: () => void;
    lagretSok: {
        fylker: string[];
        yrkeskategorier: string[];
    };
    onVisAvmeldModal: () => void;
}

function AktivBrukerStateless(props: Props) {
    const {
        sprak,
        isEditMode,
        visAvmeldModal,
        lagretSok,
        onSubmitStillingsSoek,
        onEditSearch,
        onCancelEditSearch,
        onVisAvmeldModal,
    } = props;
    return (
        <Box
            padding="space-16"
            borderRadius="large"
            shadow="xsmall"
            className={'mb-4'}
            borderColor={'border-subtle'}
            borderWidth={'1'}
        >
            <div className={'flex justify-between mb-2'}>
                <Heading size={'medium'} level={'3'} className={'mb-4'}>
                    Ledige stillinger
                </Heading>
                <FlerValgsMeny onEditSearch={onEditSearch} onEnd={onVisAvmeldModal} sprak={sprak} />
            </div>
            {!isEditMode && (
                <ErrorBoundary errorComponent={() => null}>
                    <Suspense fallback={<Loader />}>
                        <LedigeStillinger useOnFetchData={props.useOnFetchStillinger} />
                    </Suspense>
                </ErrorBoundary>
            )}
            {isEditMode && (
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
                    onConfirm={() => console.log('onConfirm')}
                    onClose={() => console.log('onClose')}
                    sprak={sprak}
                />
            )}
        </Box>
    );
}

export default AktivBrukerStateless;
