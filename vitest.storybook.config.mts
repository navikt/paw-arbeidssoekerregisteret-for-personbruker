import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import path from 'path';
import { defineConfig } from 'vitest/config';

const rootDir = import.meta.dirname;

process.env['VITEST_STORYBOOK_CONFIG'] = JSON.stringify({ a11y: true });

export default defineConfig({
    test: {
        projects: [
            {
                extends: false,
                optimizeDeps: {
                    include: ['@testing-library/dom'],
                },
                plugins: [
                    storybookTest({
                        configDir: path.join(rootDir, '.storybook'),
                        initialGlobals: {
                            viewport: { value: 'desktop', isRotated: false },
                        },
                    }),
                ],
                test: {
                    name: 'storybook-desktop',
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: playwright(),
                        instances: [
                            {
                                browser: 'chromium',
                                name: 'desktop',
                                viewport: { width: 1280, height: 900 },
                            },
                        ],
                    },
                },
            },
            {
                extends: false,
                optimizeDeps: {
                    include: ['@testing-library/dom'],
                },
                plugins: [
                    storybookTest({
                        configDir: path.join(rootDir, '.storybook'),
                        initialGlobals: {
                            viewport: { value: 'mobile', isRotated: false },
                        },
                    }),
                ],
                test: {
                    name: 'storybook-mobile',
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: playwright(),
                        instances: [
                            {
                                browser: 'chromium',
                                name: 'mobile',
                                viewport: { width: 320, height: 900 },
                            },
                        ],
                    },
                },
            },
        ],
    },
});
