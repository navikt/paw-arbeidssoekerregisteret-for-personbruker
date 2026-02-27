import { hentYrkeskategorier } from '@/lib/hent-yrkeskategorier';
import { StedSoek } from '@/model/brukerprofil';
import { byggStyrkTilUnderkategorinavnMap, byggYrkeskodeTilStyrkMap } from '@/lib/bygg-yrkeskode-til-styrk-map';

/**
 * Opprett en URL basert på informasjon fra brukerprofil (api)
 * - yrkeskategorier basert på styrk08 (feltnavn)
 * - geografi basert på fylke og kommune
 *
 * @param stedSoek - Stedsøk informasjon fra brukerprofil
 * @returns Formatert URL til arbeidsplassen.nav.no
 * @throws Error hvis henting av yrkeskategorier feiler
 */
export function opprettLinkTilArbeidsplassen(stedSoek: StedSoek): string {
    if (!stedSoek) {
        throw new Error('StedSoek er påkrevd');
    }

    const BASE_URL = 'https://arbeidsplassen.nav.no/stillinger';
    const urlParams = new URLSearchParams();

    // Versjonering (arbeidsplassen)
    urlParams.set('v', '5');

    const styrkKoder = stedSoek.styrk08;
    if (styrkKoder && styrkKoder.length > 0) {
        try {
            const alleYrkeskategorierFraBrukerprofil = hentYrkeskategorier(styrkKoder);
            const yrkeskodeTilStyrkMap = byggYrkeskodeTilStyrkMap();
            alleYrkeskategorierFraBrukerprofil.forEach((kategori) => {
                const alleStyrkKoderForKategori = yrkeskodeTilStyrkMap.get(kategori)!;
                urlParams.append('occupationLevel1', kategori);
                const harValgtUnderkategori = alleStyrkKoderForKategori.some((styrk) => !styrkKoder.includes(styrk));
                if (harValgtUnderkategori) {
                    const underkategorier = alleStyrkKoderForKategori.filter((styrk) => styrkKoder.includes(styrk));
                    const underkategoriNavnMap = byggStyrkTilUnderkategorinavnMap();
                    underkategorier.forEach((styrk) => {
                        const underkategoriNavn = underkategoriNavnMap.get(styrk);
                        if (underkategoriNavn) {
                            urlParams.append('occupationLevel2', `${kategori}.${underkategoriNavn}`);
                        }
                    });
                }
            });
        } catch (error) {
            console.warn('Feil ved henting av yrkeskategorier:', error);
        }
    }

    if (stedSoek.fylker && stedSoek.fylker.length > 0) {
        stedSoek.fylker.forEach((fylke) => {
            if (fylke.navn && fylke.navn.trim()) {
                urlParams.append('county', fylke.navn.toUpperCase());
            }
            if (fylke.kommuner.length > 0) {
                fylke.kommuner.forEach((kommune) => {
                    urlParams.append('municipal', `${fylke.navn.toUpperCase()}.${kommune.navn.toUpperCase()}`);
                });
            }
        });
    }
    return `${BASE_URL}?${urlParams.toString()}`;
}
