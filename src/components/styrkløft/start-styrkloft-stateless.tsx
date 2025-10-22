import GodkjennEksperiment from '@/components/styrkløft/godkjenn-eksperiment';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import VelgStillingssoek from '@/components/styrkløft/velg-stillingssoek';
import { KvitteringAvmeldt } from '@/components/styrkløft/kvittering-avmeldt';
import { Tjenestestatus } from '@/model/brukerprofil';

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

    if (visGodkjennEksperiment) {
        return (
            <GodkjennEksperiment
                sprak={sprak}
                onSubmit={onSubmitTjenestestatus}
                pending={pendingTjenestestatus}
                error={errorTjenestestatus}
            />
        );
    } else if (visVelgFiltere) {
        return <VelgStillingssoek sprak={sprak} onSubmit={onSubmitStillingsSoek} />;
    } else if (visAvmeldtKvittering) {
        return <KvitteringAvmeldt />;
    }

    return null;
}
