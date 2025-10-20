import arbeidsplassenMapping from './arbeidsplassen-mapping.json';

export function byggYrkeskodeTilStyrkMap(): Map<string, string[]> {
    const map = new Map<string, string[]>();
    Object.values(arbeidsplassenMapping).forEach((value) => {
        if (value.styrkCode === '0000') {
            return;
        }

        map.set(value.categoryLevel1, (map.get(value.categoryLevel1) ?? []).concat(value.styrkCode));
    });
    return map;
}
