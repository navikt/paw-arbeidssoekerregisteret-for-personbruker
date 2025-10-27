import { Box, Heading } from '@navikt/ds-react';
import { FlerValgsMeny } from '@/components/styrkløft/flervalgsmeny';
import LedigeStillinger from '@/components/styrkløft/ledige-stillinger';
import { AktivBrukerProps } from '@/components/styrkløft/aktiv-bruker';
import VelgStillingssoek from '@/components/styrkløft/velg-stillingssoek';
import { hentYrkeskategorier } from '@/lib/hent-yrkeskategorier';

interface Props extends AktivBrukerProps {
    isEditMode: boolean;
    visAvmeldModal: boolean;
    onEditSearch: () => void;
    lagretSok: {
        fylker: string[];
        yrkeskategorier: string[];
    };
}

function AktivBrukerStateless(props: Props) {
    const { sprak, isEditMode, lagretSok, onSubmitStillingsSoek, onEditSearch } = props;
    return (
        <Box padding="space-16" borderRadius="large" shadow="xsmall" className={'mb-4'}>
            <div className={'flex justify-between mb-2'}>
                <Heading size={'medium'} level={'3'} className={'mb-4'}>
                    Ledige stillinger
                </Heading>
                <FlerValgsMeny onEditSearch={onEditSearch} onEnd={() => console.log('onEnd')} sprak={sprak} />
            </div>
            {!isEditMode && <LedigeStillinger fetchData={props.onFetchStillinger} />}
            {isEditMode && (
                <VelgStillingssoek
                    sprak={sprak}
                    fylker={lagretSok.fylker}
                    yrkeskategorier={lagretSok.yrkeskategorier}
                    onSubmit={onSubmitStillingsSoek}
                />
            )}
        </Box>
    );
}

export default AktivBrukerStateless;
