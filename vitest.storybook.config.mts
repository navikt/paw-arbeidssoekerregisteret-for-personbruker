import path from 'path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const rootDir = import.meta.dirname;

process.env['VITEST_STORYBOOK_CONFIG'] = JSON.stringify({ a11y: true });

export default defineConfig({
    plugins: [
        storybookTest({
            configDir: path.join(rootDir, '.storybook'),
        }),
    ],
    optimizeDeps: {
        include: ['@testing-library/dom'],
    },
    test: {
        name: 'storybook',
        browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
        },
        watch: false,
    },
});
