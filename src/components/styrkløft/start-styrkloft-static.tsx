import GodkjennEksperiment from '@/components/styrkløft/godkjenn-eksperiment';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import Kvittering from '@/components/styrkløft/kvittering';
import { KvitteringAvmeldt } from '@/components/styrkløft/kvittering-avmeldt';

interface Props {
    onSubmit(): Promise<void>;
    visGodkjennEksperiment: boolean;
    visVelgFiltere: boolean;
    visAvmeldtKvittering: boolean;
    sprak: Sprak;
}

export function StartStyrkloftStatic(props: Props) {
    const { visGodkjennEksperiment, visVelgFiltere, visAvmeldtKvittering} = props;

    if (visGodkjennEksperiment) {
        return <GodkjennEksperiment {...props} />;
    }

    if (visVelgFiltere) {
        return <Kvittering {...props} />;
    }

    if (visAvmeldtKvittering) {
        return <KvitteringAvmeldt  />;
    }

    return null;
}
