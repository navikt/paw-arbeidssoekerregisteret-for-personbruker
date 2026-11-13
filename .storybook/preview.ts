import type { Preview } from '@storybook/nextjs-vite';
import '../src/app/globals.css';
import { mswLoader } from 'msw-storybook-addon/csf3';
import { assertHelSideUu } from '../src/test/uu';

const isStatic = typeof window !== 'undefined' && window.location.pathname.includes('/storybook/');

const setupWorker = async () => {
    const { setupWorker } = await import('msw/browser');
    const worker = setupWorker();

    await worker.start({
        serviceWorker: {
            url: isStatic ? '/arbeidssoekerregisteret/storybook/mockServiceWorker.js' : '/mockServiceWorker.js',
        },
    });

    return worker;
};

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        viewport: {
            options: {
                desktop: {
                    name: 'Desktop (1280 px)',
                    styles: { width: '1280px', height: '900px' },
                },
                mobile: {
                    name: 'Mobil (320 px)',
                    styles: { width: '320px', height: '900px' },
                },
            },
        },
        // Makes addon-a11y violations fail Storybook Vitest runs in CI.
        a11y: {
            test: 'error',
            config: {
                rules: [{ id: 'target-size', enabled: true }],
            },
        },
    },
    beforeEach: (context) => {
        if (context.parameters.uu?.helSide === true) {
            const rules = context.parameters.a11y?.config?.rules;
            if (Array.isArray(rules) && !rules.some((rule) => rule.id === 'target-size')) {
                context.parameters.a11y.config.rules = [...rules, { id: 'target-size', enabled: true }];
            }
        }
    },
    afterEach: (context) => {
        if (context.parameters.uu?.helSide === true) {
            const rules = context.parameters.a11y?.config?.rules;
            const hasEnabledRule = (id: string) =>
                Array.isArray(rules) && rules.some((rule) => rule.id === id && rule.enabled === true);
            const hasRegionRule = Array.isArray(rules) && rules.some((rule) => rule.id === 'region');

            if (!hasEnabledRule('target-size') || (hasRegionRule && !hasEnabledRule('region'))) {
                throw new Error('Helsidestories må ha target-size og aktivere region-regelen når den er oppgitt.');
            }

            assertHelSideUu(context.canvasElement);
        }
    },
    // Provide the MSW addon loader globally
    loaders: [mswLoader(setupWorker)],
};

export default preview;
