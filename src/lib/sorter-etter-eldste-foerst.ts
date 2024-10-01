import { TilgjengeligeBekreftelser } from '../types/bekreftelse';

export function sorterEtterEldsteFoerst(tilgjengeligeBekreftelser?: TilgjengeligeBekreftelser) {
    if (!tilgjengeligeBekreftelser || tilgjengeligeBekreftelser.length === 0) {
        return [];
    }

    return tilgjengeligeBekreftelser.sort((a, b) => {
        return new Date(a.gjelderFra).getTime() - new Date(b.gjelderFra).getTime();
    });
}
