import { DecoratorParams, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import Script from 'next/script';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Arbeidssøkerregisteret',
    description: 'NAV arbeidssøkerregisteret',
};

const defaultBreadcrumbs = [
    {
        title: 'Min side',
        url: '/minside',
    },
    {
        title: 'Arbeidssøkerregisteret',
        url: '/arbeidssoekerregisteret',
    },
];

export default async function RootLayout(
    props: Readonly<{
        children: React.ReactNode;
        breadcrumbs?: DecoratorParams['breadcrumbs'];
    }>,
) {
    const { children, breadcrumbs } = props;
    const Decorator = await fetchDecoratorReact({
        env: (process.env.DEKORATOR_ENV as 'prod' | 'dev') ?? 'dev',
        params: {
            breadcrumbs: breadcrumbs ?? defaultBreadcrumbs,
        },
    });
    return (
        <html lang="no">
            <head>
                <Decorator.HeadAssets />
            </head>
            <body>
                <Decorator.Header />
                {children}
                <Decorator.Footer />
                <Decorator.Scripts loader={Script} />
            </body>
        </html>
    );
}
