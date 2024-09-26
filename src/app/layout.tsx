import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import Script from 'next/script';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Arbeidssøkerregisteret',
    description: 'NAV arbeidssøkerregisteret',
};

const dekoratorEnv = process.env.DEKORATOR_ENV as 'prod' | 'dev' ?? 'dev';

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const Decorator = await fetchDecoratorReact({
        env: dekoratorEnv,
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
