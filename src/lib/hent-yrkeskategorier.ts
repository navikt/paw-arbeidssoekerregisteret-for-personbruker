import arbeidsplassenMapping from './arbeidsplassen-mapping.json';

export const alfabetiskSortering = (a: string, b: string) => {
    const nameA = a.toLowerCase();
    const nameB = b.toLowerCase();
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
};

export function hentAlleYrkeskategorier(): string[] {
    return Array.from(new Set(Object.values(arbeidsplassenMapping).map((d) => d.categoryLevel1)))
        .filter((c) => !c.includes('Uoppgitt'))
        .sort(alfabetiskSortering);
}

export function hentYrkeskategorier(styrkkoder: string[]) {
    return Array.from(
        new Set(
            styrkkoder.map((styrk) => {
                return arbeidsplassenMapping[styrk as keyof typeof arbeidsplassenMapping]?.categoryLevel1;
            }),
        ),
    )
        .filter((i) => i)
        .sort(alfabetiskSortering);
}
