import type { Sprak } from '@navikt/arbeidssokerregisteret-utils';

export const getSprakAttribute = (sprak: Sprak = 'nb') => {
    if (['nb', 'en', 'nn'].includes(sprak)) {
        return sprak;
    }
    return 'nb';
};

export function leggSprakTilEksternUrl(baseUrl: string, sprak: Sprak, postFix?: string) {
    return `${baseUrl}${sprak === 'nb' ? '' : `/${sprak}`}${postFix ? `/${postFix}` : ''}`;
}

export function tilSprakAvhengigAppPath(path: string, sprak: Sprak) {
    if (path[0] !== '/') {
        throw new Error('path må begynne med /');
    }

    const sprakUrl = sprak === 'nb' ? '' : `/${sprak}`;
    return `${sprakUrl}${path}`;
}
