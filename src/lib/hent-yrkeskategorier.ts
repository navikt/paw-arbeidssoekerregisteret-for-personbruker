import arbeidsplassenMapping from './arbeidsplassen-mapping.json';

export function hentYrkeskategorier() {
    return Array.from(new Set(Object.values(arbeidsplassenMapping).map((d) => d.categoryLevel1)))
        .filter((c) => !c.includes('Uoppgitt'))
        .sort();
}
