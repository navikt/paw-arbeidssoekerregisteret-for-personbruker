import GodkjennEksperiment from '@/components/styrkløft/godkjenn-eksperiment';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import VelgStillingssoek from '@/components/styrkløft/velg-stillingssoek';
import { KvitteringAvmeldt } from '@/components/styrkløft/kvittering-avmeldt';
import { Tjenestestatus } from '@/model/brukerprofil';
import { Box } from '@navikt/ds-react';

interface Props {
    onSubmitTjenestestatus(status: Tjenestestatus): Promise<void>;
    onSubmitStillingsSoek(data: any): Promise<void>;
    visGodkjennEksperiment: boolean;
    visVelgFiltere: boolean;
    visAvmeldtKvittering: boolean;
    pendingTjenestestatus: null | Tjenestestatus;
    errorTjenestestatus: null | string;
    sprak: Sprak;
}

export function StartStyrkloftStateless(props: Props) {
    const {
        visGodkjennEksperiment,
        visVelgFiltere,
        visAvmeldtKvittering,
        sprak,
        onSubmitTjenestestatus,
        onSubmitStillingsSoek,
        pendingTjenestestatus,
        errorTjenestestatus,
    } = props;

    if (visAvmeldtKvittering) {
        return <KvitteringAvmeldt sprak={sprak} />;
    } else if (visGodkjennEksperiment || visVelgFiltere) {
        return (
            <Box className={'py-4 px-6'} borderRadius="8" borderColor={'neutral-subtle'} borderWidth={'1'}>
                {visVelgFiltere && <VelgStillingssoek sprak={sprak} onSubmit={onSubmitStillingsSoek} />}
                {visGodkjennEksperiment && !visVelgFiltere && (
                    <GodkjennEksperiment
                        sprak={sprak}
                        onSubmit={onSubmitTjenestestatus}
                        pending={pendingTjenestestatus}
                        error={errorTjenestestatus}
                    />
                )}
            </Box>
        );
    }

    return null;
}
