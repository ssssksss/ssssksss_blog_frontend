import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {},
    },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: path.resolve(__dirname, '/next.config.js'),
    },
  },
  docs: {
    autodocs: 'tag',
  },
  // typescript: {
  //   check: true,
  //   skipCompiler: false,
  // },
};
export default config;
