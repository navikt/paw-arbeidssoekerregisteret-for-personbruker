import { Box } from '@navikt/ds-react';
import { FlerValgsMeny } from '@/components/styrkløft/flervalgsmeny';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import LedigeStillinger from '@/components/styrkløft/ledige-stillinger';
import { Tjenestestatus } from '@/model/brukerprofil';

interface Props {
    onSubmitTjenestestatus(status: Tjenestestatus): Promise<void>;
    onSubmitStillingsSoek(data: any): Promise<void>;
    onFetchStillinger(): Promise<{ data?: any; error?: Error }>;
    sprak: Sprak;
    isStorybook?: boolean;
}

function AktivBruker(props: Props) {
    const { sprak } = props;
    return (
        <Box padding="space-16" borderRadius="large" shadow="xsmall">
            <div className={'flex justify-end mb-2'}>
                <FlerValgsMeny
                    onEditSearch={() => console.log('onEditSearch')}
                    onEnd={() => console.log('onEnd')}
                    sprak={sprak}
                />
            </div>
            <LedigeStillinger fetchData={props.onFetchStillinger} isStorybook={props.isStorybook} />
        </Box>
    );
}

export default AktivBruker;
