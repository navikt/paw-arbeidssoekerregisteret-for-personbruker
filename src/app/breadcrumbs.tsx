'use client';

import { useEffect } from 'react';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';

export default function Breadcrumbs() {
    useEffect(() => {
        setBreadcrumbs([
            {
                title: 'Min side',
                url: '/minside',
            },
            {
                title: 'Arbeidssøkerregisteret',
                url: '/arbeidssoekerregisteret',
            },
        ]);
    }, []);
    return null;
}
