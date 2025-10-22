import { hentYrkeskategorier } from '@/lib/hent-yrkeskategorier';
import { Brukerprofil } from '@/model/brukerprofil';

/**
 * Opprett en URL basert på informasjon fra brukerprofil (api)
 * - yrkeskategorier basert på styrk08 (feltnavn)
 * - geografi basert på fylke og kommune
 */
export function opprettLinkTilArbeidsplassen(brukerprofil: Brukerprofil): string {
    const BASE_URL = 'https://arbeidsplassen.nav.no/stillinger?';

    const stedSoek = brukerprofil.stillingssoek?.find((el) => el.soekType === 'STED_SOEK_V1');
    const styrkKoder = stedSoek?.styrk08;

    // formater yrkeskategorier
    let urlFormaterteKategorier = '';
    if (styrkKoder) {
        const alleYrkeskategorierFraBrukerprofil = hentYrkeskategorier(styrkKoder);
        urlFormaterteKategorier = alleYrkeskategorierFraBrukerprofil
            .map((kategori) => `occupationLevel1=${encodeURIComponent(kategori)}`)
            .join('&');
    }

    // formater geografi
    const alleFylker = stedSoek?.fylker?.map((el) => el.navn);
    const formaterteFylker = alleFylker?.map((fylke) => `county=${encodeURIComponent(fylke.toUpperCase())}`).join('&');

    return `${BASE_URL}${urlFormaterteKategorier}&v=5&${formaterteFylker}`;
}
