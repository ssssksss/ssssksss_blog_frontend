import '@emotion/react';
import { rootTheme } from './theme';

type ThemeType = typeof rootTheme;

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}
