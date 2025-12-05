import { hentFylkeliste } from '@/lib/hent-fylkeliste';
import { byggYrkeskodeTilStyrkMap } from '@/lib/bygg-yrkeskode-til-styrk-map';
import { Stillingssoek } from '@/model/brukerprofil';

interface Incoming {
    fylker: string[];
    yrkeskategorier: string[];
}

function byggStillingssoekPayload(val: Incoming): Array<Stillingssoek> {
    const yrkeskodeTilStyrkMap = byggYrkeskodeTilStyrkMap();
    const styrk08 = val.yrkeskategorier.flatMap((kategori) => yrkeskodeTilStyrkMap.get(kategori)) as string[];
    return [
        {
            soekType: 'STED_SOEK_V1',
            soekeord: [],
            fylker: hentFylkeliste(val.fylker),
            styrk08,
        },
    ];
}

export default byggStillingssoekPayload;
