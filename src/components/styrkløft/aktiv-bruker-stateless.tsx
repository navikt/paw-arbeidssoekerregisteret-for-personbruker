import { Box } from '@navikt/ds-react';
import { FlerValgsMeny } from '@/components/styrkløft/flervalgsmeny';
import LedigeStillinger from '@/components/styrkløft/ledige-stillinger';
import { AktivBrukerProps } from '@/components/styrkløft/aktiv-bruker';
import VelgStillingssoek from '@/components/styrkløft/velg-stillingssoek';
import { hentYrkeskategorier } from '@/lib/hent-yrkeskategorier';

interface Props extends AktivBrukerProps {
    isEditMode: boolean;
    visAvmeldModal: boolean;
    onEditSearch: () => void;
}

function AktivBrukerStateless(props: Props) {
    const { sprak, isEditMode, brukerprofil, onSubmitStillingsSoek, onEditSearch } = props;
    const lagretSoek = (brukerprofil.stillingssoek ?? []).find((s) => s.soekType === 'STED_SOEK_V1');
    const fylker = (lagretSoek?.fylker ?? []).map((f) => f.navn);
    const yrkeskategories = hentYrkeskategorier(lagretSoek?.styrk08 ?? []);
    return (
        <Box padding="space-16" borderRadius="large" shadow="xsmall">
            <div className={'flex justify-end mb-2'}>
                <FlerValgsMeny onEditSearch={onEditSearch} onEnd={() => console.log('onEnd')} sprak={sprak} />
            </div>
            {!isEditMode && <LedigeStillinger fetchData={props.onFetchStillinger} />}
            {isEditMode && (
                <VelgStillingssoek
                    sprak={sprak}
                    fylker={fylker}
                    yrkeskategorier={yrkeskategories}
                    onSubmit={onSubmitStillingsSoek}
                />
            )}
        </Box>
    );
}

export default AktivBrukerStateless;
