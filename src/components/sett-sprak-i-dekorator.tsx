'use client';

import { erStottetSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { useEffect } from 'react';
import { onLanguageSelect, setParams } from '@navikt/nav-dekoratoren-moduler';
import { useRouter } from 'next/navigation';

const SettSprakIDekorator = ({ sprak }: { sprak: Sprak }) => {
    const router = useRouter();

    onLanguageSelect((language) => {
        const [_leadingSlash, _basePath, _oldLocale, ...rest] = window.location.pathname.split("/");

        if(!erStottetSprak(_oldLocale)) {
            // språk er 'nb', så _oldLocale inneholder basePath
            rest.unshift(_oldLocale);
        }

        const slug = rest.join("/");
        const sprakUrl = language.locale === 'nb' ? '' : `/${language.locale}`;
        console.log('language?', language);
        console.log('ny URL', `${sprakUrl}/${slug}`);

        router.push(`${sprakUrl}/${slug}`);
    });

    useEffect(() => {
        setParams({ language: sprak });
    }, [sprak]);
    return null;
};

export default SettSprakIDekorator;
