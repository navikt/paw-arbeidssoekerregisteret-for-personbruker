import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import Script from 'next/script';
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
    title: 'Arbeidssøker bekreftelse',
    description: 'NAV arbeidssøkerregisteret - Bekreft at du vil være arbeidssøker',
};

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const Decorator = await fetchDecoratorReact({
        env: (process.env.DEKORATOR_ENV as 'prod' | 'dev') ?? 'dev',
        params: {
            breadcrumbs: [
                {
                    title: 'Min side',
                    url: '/minside',
                },
                {
                    title: 'Arbeidssøkerregisteret',
                    url: '/arbeidssoekerregisteret',
                },
                {
                    title: 'Bekreftelse',
                    url: '/arbeidssoekerregisteret/bekreftelse',
                },
            ],
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
