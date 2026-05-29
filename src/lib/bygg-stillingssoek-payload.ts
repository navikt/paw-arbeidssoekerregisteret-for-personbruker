import { byggYrkeskodeTilStyrkMap } from '@/lib/bygg-yrkeskode-til-styrk-map';
import { byggFylkerMedKommunerPayload } from '@/lib/hent-fylkeliste';
import type { Stillingssoek } from '@/model/brukerprofil';
import type { StillingsSoekPayload } from '@/model/stillings-soek';

function byggStillingssoekPayload(val: StillingsSoekPayload): Array<Stillingssoek> {
    const { fylker, yrkeskategorier, visStillingerUtenKrav } = val;
    const yrkeskodeTilStyrkMap = byggYrkeskodeTilStyrkMap();
    const styrk08 = yrkeskategorier.flatMap((kategori) => yrkeskodeTilStyrkMap.get(kategori)) as string[];
    return [
        {
            soekType: 'STED_SOEK_V1',
            soekeord: [],
            fylker: byggFylkerMedKommunerPayload(fylker),
            styrk08,
            soekeTags: visStillingerUtenKrav
                ? ['INGEN_KRAV_TIL_ARBEIDSERFARING_V1' /*, 'INGEN_KRAV_TIL_UTDANNING_V1'*/]
                : [],
        },
    ];
}

export default byggStillingssoekPayload;
