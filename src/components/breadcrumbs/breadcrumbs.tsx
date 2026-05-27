'use client';

import { type DecoratorParams, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useEffect } from 'react';

export default function Breadcrumbs(props: { breadcrumbs: NonNullable<DecoratorParams['breadcrumbs']> }) {
    const { breadcrumbs } = props;

    useEffect(() => {
        setBreadcrumbs(breadcrumbs);
    }, [breadcrumbs]);

    return null;
}
