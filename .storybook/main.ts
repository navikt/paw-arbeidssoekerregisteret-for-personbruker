import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
    staticDirs: ['../msw'],
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-onboarding',
        '@storybook/addon-links',
        '@chromatic-com/storybook',
        '@storybook/addon-a11y',
        '@storybook/addon-docs',
        '@storybook/addon-vitest',
    ],
    framework: {
        name: '@storybook/nextjs-vite',
        options: {},
    },
};
export default config;
