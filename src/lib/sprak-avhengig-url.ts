import type { Sprak } from '@navikt/arbeidssokerregisteret-utils';

function tilSprakAvhengigAppPath(path: string, sprak: Sprak) {
    if (path[0] !== '/') {
        throw new Error('path må begynne med /');
    }

    const sprakUrl = sprak === 'nb' ? '' : `/${sprak}`;
    return `${sprakUrl}${path}`;
}

export default tilSprakAvhengigAppPath;
