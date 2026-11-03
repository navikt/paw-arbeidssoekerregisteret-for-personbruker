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
        // Makes addon-a11y violations fail Storybook Vitest runs in CI.
        a11y: {
            test: 'error',
        },
    },
    afterEach: (context) => {
        if (context.parameters.uu?.helSide === true) {
            assertHelSideUu(context.canvasElement);
        }
    },
    // Provide the MSW addon loader globally
    loaders: [mswLoader(setupWorker)],
};

export default preview;
