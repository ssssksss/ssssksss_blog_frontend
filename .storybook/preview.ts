// import type { Preview } from '@storybook/react';

// import { ThemeProvider } from '@emotion/react';
// import { withThemeFromJSXProvider } from '@storybook/addon-themes';
// import { GlobalStyles } from '@styles/GlobalStyles';
// import { darkTheme, purpleTheme } from '@styles/theme';

// const preview: Preview = {
//   parameters: {
//     actions: { argTypesRegex: '^on[A-Z].*' },
//     controls: {
//       matchers: {
//         color: /(background|color)$/i,
//         date: /Date$/,
//       },
//     },
//   },
//   viewport: {
//     viewports: {
//       mobile1: {
//         name: 'iPhone 13 mini',
//         styles: {
//           width: '37.5rem',
//           height: '81.2rem',
//         },
//         type: 'mobile',
//       },
//       mobile2: {
//         name: 'iPhone 13 / 13 pro',
//         styles: {
//           width: '39rem',
//           height: '84.4rem',
//         },
//         type: 'mobile',
//       },
//       tablet1: {
//         name: 'iPad Pro 11"',
//         styles: {
//           width: '83.4rem',
//           height: '119.4rem',
//         },
//         type: 'tablet',
//       },
//     },
//     defaultViewport: 'mobile1',
//   },
//   decorators: [
//     withThemeFromJSXProvider({
//       themes: {
//         darkTheme: darkTheme,
//         purpleTheme: purpleTheme,
//       },
//       Provider: ThemeProvider,
//       GlobalStyles,
//     }),
//   ],
// };

// export default preview;
