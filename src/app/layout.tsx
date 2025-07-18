import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import Script from 'next/script';
import type { Metadata } from 'next';
import './globals.css';
import InitAmplitude from '@/components/init-amplitude';
import { isEnabled } from '@/lib/unleash-is-enabled';

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
    const inkluderUmami = await isEnabled('arbeidssoekerregisteret.bruk-umami');
    return (
        <html lang="nb">
            <head>
                <Decorator.HeadAssets />
            </head>
            <body>
                <Decorator.Header />
                <InitAmplitude apiKey={process.env.AMPLITUDE_API_KEY!} />
                <main>{children}</main>
                <Decorator.Footer />
                <Decorator.Scripts loader={Script} />
                {inkluderUmami && (
                    <Script
                        defer
                        strategy="afterInteractive"
                        src="https://cdn.nav.no/team-researchops/sporing/sporing.js"
                        data-host-url="https://umami.nav.no"
                        data-website-id={process.env.UMAMI_TRACKING_ID!}
                    ></Script>
                )}
            </body>
        </html>
    );
}
