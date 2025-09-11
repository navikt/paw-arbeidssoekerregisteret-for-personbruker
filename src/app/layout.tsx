import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import Script from 'next/script';
import type { Metadata } from 'next';
import './globals.css';
import { FeatureTogglesProvider } from '@/contexts/feature-toggle-context';
import InitFaroKomponent from '@/components/init-faro-komponent';

export const metadata: Metadata = {
    title: 'Arbeidssøkerregisteret',
    description: 'Nav arbeidssøkerregisteret',
};

export default async function RootLayout({
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
            ],
            availableLanguages: [
                {
                    locale: 'nb',
                    // url: process.env.NEXT_PUBLIC_SELF_URL!,
                    handleInApp: true,
                },
                {
                    locale: 'en',
                    // url: `${process.env.NEXT_PUBLIC_SELF_URL!}/en`,
                    handleInApp: true,
                },
                {
                    locale: 'nn',
                    // url: `${process.env.NEXT_PUBLIC_SELF_URL!}/nn`,
                    handleInApp: true,
                },
            ],
        },
    });
    return (
        <html lang="nb">
            <head>
                <Decorator.HeadAssets />
            </head>
            <body>
                <Decorator.Header />
                <InitFaroKomponent />
                <FeatureTogglesProvider>
                    <main>{children}</main>
                </FeatureTogglesProvider>
                <Decorator.Footer />
                <Decorator.Scripts loader={Script} />
            </body>
        </html>
    );
}
