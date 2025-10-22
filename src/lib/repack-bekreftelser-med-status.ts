import { BekreftelseMedStatusResponse, AggregerteBekreftelser } from '@/model/bekreftelse';

export function repackBekreftelserMedStatus(bekreftelserMedStatus: BekreftelseMedStatusResponse[]) {
    return bekreftelserMedStatus.reduce((total, current) => {
        const { periodeId } = current.bekreftelse;
        if (!Object.keys(total).includes(periodeId)) {
            total[periodeId] = [];
        }
        total[periodeId].push({ status: current.status, ...current.bekreftelse });
        return total;
    }, {} as AggregerteBekreftelser);
}
