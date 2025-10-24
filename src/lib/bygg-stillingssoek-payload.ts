import { hentFylkeliste } from '@/lib/hent-fylkeliste';
import { byggYrkeskodeTilStyrkMap } from '@/lib/bygg-yrkeskode-til-styrk-map';

interface Incoming {
    fylker: string[];
    yrkeskategorier: string[];
}

function byggStillingssoekPayload(val: Incoming) {
    const yrkeskodeTilStyrkMap = byggYrkeskodeTilStyrkMap();
    const styrk08 = val.yrkeskategorier.flatMap((kategori) => yrkeskodeTilStyrkMap.get(kategori));
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
