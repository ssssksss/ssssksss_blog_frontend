import type { Preview } from '@storybook/react';

import { GlobalStyles } from '@/styles/GlobalStyles';
import { darkTheme, purpleTheme } from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';

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
    withThemeFromJSXProvider({
      themes: {
        darkTheme: darkTheme,
        purpleTheme: purpleTheme,
      },
      defaultTheme: 'purpleTheme',
      Provider: ThemeProvider,
      GlobalStyles,
    }),
  ],
};

export default preview;
