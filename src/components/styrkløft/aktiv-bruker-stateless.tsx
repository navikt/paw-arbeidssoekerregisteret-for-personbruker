import { Box } from '@navikt/ds-react';
import { FlerValgsMeny } from '@/components/styrkløft/flervalgsmeny';
import LedigeStillinger from '@/components/styrkløft/ledige-stillinger';
import { AktivBrukerProps } from '@/components/styrkløft/aktiv-bruker';
import VelgStillingssoek from '@/components/styrkløft/velg-stillingssoek';

interface Props extends AktivBrukerProps {
    isEditMode: boolean;
    visAvmeldModal: boolean;
}

function AktivBrukerStateless(props: Props) {
    const { sprak, isEditMode } = props;
    return (
        <Box padding="space-16" borderRadius="large" shadow="xsmall">
            <div className={'flex justify-end mb-2'}>
                <FlerValgsMeny
                    onEditSearch={() => console.log('onEditSearch')}
                    onEnd={() => console.log('onEnd')}
                    sprak={sprak}
                />
            </div>
            {!isEditMode && <LedigeStillinger fetchData={props.onFetchStillinger} />}
            {/*{isEditMode && <VelgStillingssoek /> }*/}
        </Box>
    );
}

export default AktivBrukerStateless;
