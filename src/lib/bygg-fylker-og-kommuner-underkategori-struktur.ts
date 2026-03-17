import { ALLE_FYLKER_OG_KOMMUMER } from '@/components/styrkløft/fylker';
import { alfabetiskSortering } from '@/lib/hent-yrkeskategorier';

interface underKategori {
    navn: string;
    kommunenummer: string;
}

interface FylkesKategori {
    navn: string;
    fylkesnummer: string;
    underKategorier: underKategori[];
}

type FylkesKategorier = FylkesKategori[];

export default function byggFylkerOgKommunerUnderkategoriStruktur() {
    return ALLE_FYLKER_OG_KOMMUMER.map((n) => ({
        navn: n.navn,
        fylkesnummer: n.fylkesnummer,
        underKategorier: n.kommuner.sort((a, b) => alfabetiskSortering(a.navn, b.navn)),
    })).sort((a, b) => alfabetiskSortering(a.navn, b.navn));
}
