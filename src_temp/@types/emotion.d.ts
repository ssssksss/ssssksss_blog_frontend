import '@emotion/react';

export type ThemeType = {
  purple: {
    primary: string;
    secondary: string;
    third: string;
  };
};

declare module '@emotion/react' {
  // Extend Emotion's Theme interface with your custom theme type
  export interface Theme extends ThemeType {}
}
