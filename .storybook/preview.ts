import type { Preview } from '@storybook/react';

import { ThemeProvider } from '@emotion/react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { GlobalStyles } from '@styles/GlobalStyles';
import { darkTheme, purpleTheme } from '@styles/theme';

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
      Provider: ThemeProvider,
      GlobalStyles,
    }),
  ],
};

export default preview;
