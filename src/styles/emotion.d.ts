import '@emotion/react';
import { purpleTheme } from './theme';

type ThemeType = typeof purpleTheme;

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}
