import type { Sprak } from '@navikt/arbeidssokerregisteret-utils';

export function leggSprakTilEksternUrl(baseUrl: string, sprak: Sprak, postFix?: string) {
    return `${baseUrl}${sprak === 'nb' ? '' : `/${sprak}`}${postFix ? `/${postFix}` : ''}`;
}
