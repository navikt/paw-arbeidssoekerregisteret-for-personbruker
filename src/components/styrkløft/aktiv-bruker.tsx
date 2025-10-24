import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Tjenestestatus } from '@/model/brukerprofil';
import AktivBrukerStateless from '@/components/styrkløft/aktiv-bruker-stateless';

export interface AktivBrukerProps {
    onSubmitTjenestestatus(status: Tjenestestatus): Promise<void>;
    onSubmitStillingsSoek(data: any): Promise<void>;
    onFetchStillinger(): Promise<{ data?: any; error?: Error }>;
    sprak: Sprak;
}

function AktivBruker(props: AktivBrukerProps) {
    return <AktivBrukerStateless {...props} isEditMode={false} visAvmeldModal={false} />;
}

export default AktivBruker;
