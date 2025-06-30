import type { Preview } from '@storybook/nextjs';
import '../src/app/globals.css';
import { initialize, mswLoader } from 'msw-storybook-addon';

const isStatic = typeof window !== 'undefined' && window.location.pathname.includes('/storybook/');
initialize({
    serviceWorker: {
        url: isStatic ? '/arbeidssoekerregisteret/storybook/mockServiceWorker.js' : '/mockServiceWorker.js',
    },
});

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    // Provide the MSW addon loader globally
    loaders: [mswLoader],
};

export default preview;
