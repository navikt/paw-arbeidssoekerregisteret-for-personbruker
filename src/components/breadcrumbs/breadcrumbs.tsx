'use client';

import { useEffect } from 'react';
import { setBreadcrumbs, DecoratorParams } from '@navikt/nav-dekoratoren-moduler';

export default function Breadcrumbs(props: { breadcrumbs: NonNullable<DecoratorParams['breadcrumbs']> }) {
    const { breadcrumbs } = props;

    useEffect(() => {
        setBreadcrumbs(breadcrumbs);
    }, [breadcrumbs]);

    return null;
}
