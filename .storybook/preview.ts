import type { Preview } from '@storybook/react';

import { Global, css, ThemeProvider } from '@emotion/react';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    // Adds global styles and theme switching support.
    withThemeFromJSXProvider({
      /* Uncomment for theme switching support */
      // themes: {
      //   light: lightTheme,
      //   dark: darkTheme,
      // }
      // defaultTheme: 'light',
      // Provider: ThemeProvider,
    }),
  ],
};

export default preview;
