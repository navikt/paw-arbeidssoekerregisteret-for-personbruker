import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
    staticDirs: ['../msw'],
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-onboarding',
        '@storybook/addon-links',
        '@chromatic-com/storybook',
        '@storybook/addon-a11y',
        '@storybook/addon-docs',
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    webpackFinal: async (config) => {
        // Tailwind v4 + webpack triggers a double-build on startup because
        // @tailwindcss/postcss re-generates CSS after all modules are known.
        // Increasing aggregateTimeout debounces rapid successive change events
        // and prevents the extra compile cycle.
        config.watchOptions = {
            ...config.watchOptions,
            aggregateTimeout: 500,
        };
        // webpack 5 sets bail=true internally after the first compilation error,
        // which stops HMR updates from being emitted. Force it off so hot-reloading
        // survives errors without requiring a full restart.
        config.bail = false;
        return config;
    },
};
export default config;
