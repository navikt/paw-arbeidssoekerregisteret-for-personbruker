import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import path from 'path';
import { defineConfig } from 'vitest/config';

const rootDir = import.meta.dirname;

process.env['VITEST_STORYBOOK_CONFIG'] = JSON.stringify({ a11y: true });

export default defineConfig({
    optimizeDeps: {
        include: ['@testing-library/dom'],
    },
    test: {
        projects: [
            {
                extends: false,
                plugins: [
                    storybookTest({
                        configDir: path.join(rootDir, '.storybook'),
                    }),
                ],
                test: {
                    name: 'storybook',
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: playwright(),
                        instances: [{ browser: 'chromium' }],
                    },
                },
            },
        ],
    },
});
