import { AggregerteBekreftelser } from '@/model/bekreftelse';
import {
    AggregertePerioder,
    AggregertPeriode,
    Bekreftelse,
    BekreftelseStatus
} from '@navikt/arbeidssokerregisteret-utils';

function isGyldigBekreftelse(bekreftelse: Bekreftelse | undefined) {
    return bekreftelse && bekreftelse.status === BekreftelseStatus.GYLDIG;
}

export function mergeGyldigeBekreftelser(
    aggregertePerioder: AggregertePerioder,
    aggregerteBekreftelser: AggregerteBekreftelser,
) {
    return aggregertePerioder.map((periode: AggregertPeriode) => {
        periode.bekreftelser = aggregerteBekreftelser[periode.periodeId]
            ? aggregerteBekreftelser[periode.periodeId].filter(isGyldigBekreftelse)
            : [];
        return periode;
    });
}
