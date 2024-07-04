import '@emotion/react';
import { flex, flexBox, grid } from '@styles/theme';

type ThemeType = themeType;

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}

export type themeType = {
  main: {
    primary100;
    primary80;
    primary60;
    primary40;
    primary20;
    secondary100;
    secondary80;
    secondary60;
    secondary40;
    secondary20;
    third100;
    third80;
    third60;
    third40;
    third20;
    contrast;
  };
  scroll: {
    hidden;
    hiddenX;
    hiddenY;
  };
  fontSize: {
    xs;
    sm;
    md;
    lg;
    xl;
  };
  borderRadius: {
    br4;
    br10;
    br16;
    br20;
    br30;
  };
  padding: {
    pd2,
    pd4,
    pd8,
    pd10,
    pd16,
  };
  deviceSizes: {
    mobile;
    tablet;
    pc;
    maxWidth;
  };
  colors: {
    [key: string]: string;
    red100;
    red80;
    red60;
    red40;
    red20;
    orange100;
    orange80;
    orange60;
    orange40;
    orange20;
    yellow100;
    yellow80;
    yellow60;
    yellow40;
    yellow20;
    green100;
    green80;
    green60;
    green40;
    green20;
    skyblue100;
    skyblue80;
    skyblue60;
    skyblue40;
    skyblue20;
    blue100;
    blue80;
    blue60;
    blue40;
    blue20;
    purple100;
    purple80;
    purple60;
    purple40;
    purple20;
    pink100;
    pink80;
    pink60;
    pink40;
    pink20;
    black100;
    black80;
    black60;
    black40;
    black20;
    gray100;
    gray80;
    gray60;
    gray40;
    gray20;
    white100;
    white80;
    white60;
    white40;
    white20;
  };
  fontFamily: {
    cookieRunRegular;
    gmarketSansBold;
    typoHelloPOP;
    yanoljaYacheBold;
    yanoljaYacheRegular;
  };
  btnSizes: {
    xs;
    sm;
    md;
    lg;
    xl;
  };
  inputSizes: {
    checkbox: {
      xs;
      sm;
      md;
      lg;
      xl;
    };
    radio: {
      xs;
      sm;
      md;
      lg;
      xl;
    };
    [('text', 'password', 'email', 'search')]: {
      xs;
      sm;
      md;
      lg;
      xl;
    };
  };
  linearGradientColors: {
    purple40deg70blue40;
  };
  flex: typeof flex;
  grid: typeof grid;
  positionStyle: {
    absolute;
  };
  calcRem: (size: number) => void;
  flexBox: typeof flexBox;
  gridBox: {
    display;
  };
};