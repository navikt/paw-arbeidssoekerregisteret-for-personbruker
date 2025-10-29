import { Box, Heading } from '@navikt/ds-react';
import { FlerValgsMeny } from '@/components/styrkløft/flervalgsmeny';
import LedigeStillinger from '@/components/styrkløft/ledige-stillinger';
import { AktivBrukerProps } from '@/components/styrkløft/aktiv-bruker';
import VelgStillingssoek from '@/components/styrkløft/velg-stillingssoek';
import { Suspense } from 'react';

interface Props extends AktivBrukerProps {
    isEditMode: boolean;
    visAvmeldModal: boolean;
    onEditSearch: () => void;
    onCancelEditSearch: () => void;
    lagretSok: {
        fylker: string[];
        yrkeskategorier: string[];
    };
}

function AktivBrukerStateless(props: Props) {
    const { sprak, isEditMode, lagretSok, onSubmitStillingsSoek, onEditSearch, onCancelEditSearch } = props;
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
                <FlerValgsMeny onEditSearch={onEditSearch} onEnd={() => console.log('onEnd')} sprak={sprak} />
            </div>
            {!isEditMode && (
                <Suspense>
                    <LedigeStillinger fetchData={props.useOnFetchStillinger} />
                </Suspense>
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
        </Box>
    );
}

export default AktivBrukerStateless;
