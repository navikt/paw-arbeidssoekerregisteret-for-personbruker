import { Box } from '@navikt/ds-react';
import { FlerValgsMeny } from '@/components/styrkløft/flervalgsmeny';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import LedigeStillinger from '@/components/styrkløft/ledige-stillinger';
import { Tjenestestatus } from '@/model/brukerprofil';
import AktivBrukerStateless from '@/components/styrkløft/aktiv-bruker-stateless';

export interface AktivBrukerProps {
    onSubmitTjenestestatus(status: Tjenestestatus): Promise<void>;
    onSubmitStillingsSoek(data: any): Promise<void>;
    onFetchStillinger(): Promise<{ data?: any; error?: Error }>;
    sprak: Sprak;
    isStorybook?: boolean;
}

function AktivBruker(props: AktivBrukerProps) {
    return <AktivBrukerStateless {...props} isEditMode={false} visAvmeldModal={false} />;
}

export default AktivBruker;
