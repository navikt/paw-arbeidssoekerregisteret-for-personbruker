import arbeidsplassenMapping from './arbeidsplassen-mapping.json';
import { alfabetiskSortering } from '@/lib/hent-yrkeskategorier';

interface underKategori {
    navn: string;
    styrk: string;
}

interface YrkesKategori {
    navn: string;
    underKategorier: underKategori[];
}

type YrkesKategorier = YrkesKategori[];

export function byggYrkeskoderTilStyrkMap() {
    const kategorimap = Object.values(arbeidsplassenMapping).reduce((byggYrkeskodeTilStyrkMap, current) => {
        const kategori = byggYrkeskodeTilStyrkMap.find((yrke) => yrke?.navn === current.categoryLevel1);
        if (current.styrkCode === '0000') {
            return byggYrkeskodeTilStyrkMap;
        }
        if (!kategori) {
            byggYrkeskodeTilStyrkMap.push({
                navn: current.categoryLevel1,
                underKategorier: [{ navn: current.categoryLevel2, styrk: current.styrkCode }],
            });
        } else {
            kategori.underKategorier.push({ navn: current.categoryLevel2, styrk: current.styrkCode });
            kategori.underKategorier.sort((a, b) => alfabetiskSortering(a.navn, b.navn));
        }
        return byggYrkeskodeTilStyrkMap;
    }, [] as YrkesKategorier);

    return kategorimap.sort((a, b) => alfabetiskSortering(a.navn, b.navn));
}
