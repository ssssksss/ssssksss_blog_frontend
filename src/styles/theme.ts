/**
 * Author : Sukyung Lee
 * FileName: theme.ts
 * Date: 2022-07-02 02:09:11
 * Description : 공통적인 스타일을 지정하여 일관성있는 스타일을 보여주기 위해 작성
 */

export type colorTypes =
  | 'red100'
  | 'red80'
  | 'red60'
  | 'red40'
  | 'red20'
  | 'orange100'
  | 'orange80'
  | 'orange60'
  | 'orange40'
  | 'orange20'
  | 'yellow100'
  | 'yellow80'
  | 'yellow60'
  | 'yellow40'
  | 'yellow20'
  | 'green100'
  | 'green80'
  | 'green60'
  | 'green40'
  | 'green20'
  | 'skyblue100'
  | 'skyblue80'
  | 'skyblue60'
  | 'skyblue40'
  | 'skyblue20'
  | 'blue100'
  | 'blue80'
  | 'blue60'
  | 'blue40'
  | 'blue20'
  | 'purple100'
  | 'purple80'
  | 'purple60'
  | 'purple40'
  | 'purple20'
  | 'pink100'
  | 'pink80'
  | 'pink60'
  | 'pink40'
  | 'pink20'
  | 'black100'
  | 'black80'
  | 'black60'
  | 'black40'
  | 'black20'
  | 'gray100'
  | 'gray80'
  | 'gray60'
  | 'gray40'
  | 'gray20'
  | 'white100'
  | 'white80'
  | 'white60'
  | 'white40'
  | 'white20';

const calcRem = (size: number) => `${size / 16}rem`;

const fontSize = {
  xs: `${calcRem(12)}`,
  sm: `${calcRem(14)}`,
  md: `${calcRem(16)}`,
  lg: `${calcRem(18)}`,
  xl: `${calcRem(20)}`,
};

const fontFamily = {
  cookieRunRegular: 'cookieRunRegular',
  gmarketSansBold: 'gmarketSansBold',
  typoHelloPOP: 'typoHelloPOP',
  yanoljaYacheBold: 'yanoljaYacheBold',
  yanoljaYacheRegular: 'yanoljaYacheRegular',
};

const borderRadius = {
  br4: '4px',
  br10: '10px',
  br16: '16px',
  br20: '20px',
  br30: '30px',
};

const padding = {
  pd2: '2px',
  pd4: '4px',
  pd8: '8px',
  pd10: '10px',
  pd16: '16px',
};

const deviceSizes = {
  mobile: '360px',
  tablet: '768px',
  pc: '1024px',
  maxWidth: '1440px',
};

const positionStyle = {
  absolute: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

// 버튼은 그때마다 사이즈가 달라서 설정이 필요한지 잘 모르겠다.
const btnSizes = {
  xs: {
    height: '16px',
    borderRadius: borderRadius.br4,
  },
  sm: {
    height: '24px',
    borderRadius: borderRadius.br10,
  },
  md: {
    height: '32px',
    borderRadius: borderRadius.br10,
  },
  lg: {
    height: '40px',
    borderRadius: borderRadius.br10,
  },
  xl: {
    height: '48px',
    borderRadius: borderRadius.br16,
  },
};

// 인풋도 그때마다 사이즈가 달라서 설정이 필요한지 잘 모르겠다.
const inputSizes = {
  [('text', 'password', 'email', 'search')]: {
    xs: {
      height: '16px',
    },
    sm: {
      height: '24px',
    },
    md: {
      height: '32px',
    },
    lg: {
      height: '40px',
    },
    xl: {
      height: '48px',
    },
  },
  [('radio', 'checkbox')]: {
    xs: {
      width: '16px',
      ['aspect-ratio']: 1,
    },
    sm: {
      width: '20px',
      ['aspect-ratio']: 1,
    },
    md: {
      width: '24px',
      ['aspect-ratio']: 1,
    },
    lg: {
      width: '28px',
      ['aspect-ratio']: 1,
    },
    xl: {
      width: '32px',
      ['aspect-ratio']: 1,
    },
  },
};

const colors = {
  red100: '#FF0000',
  red80: '#FF3333',
  red60: '#FF6666',
  red40: '#FF9999',
  red20: '#FFCCCC',
  orange100: '#FF9900',
  orange80: '#FFAD33',
  orange60: '#FFC266',
  orange40: '#FFD699',
  orange20: '#FFEBCC',
  yellow100: '#FAFF00',
  yellow80: '#FBFF33',
  yellow60: '#FCFF66',
  yellow40: '#FDFF99',
  yellow20: '#FEFFCC',
  green100: '#18A934',
  green80: '#46BA5D',
  green60: '#74CB85',
  green40: '#A3DDAE',
  green20: '#D1EED6',
  skyblue100: '#56CCF2',
  skyblue80: '#78D6F5',
  skyblue60: '#9AE0F7',
  skyblue40: '#BBEBFA',
  skyblue20: '#DDF5FC',
  blue100: '#3454FF',
  blue80: '#5D76FF',
  blue60: '#8598FF',
  blue40: '#AEBBFF',
  blue20: '#D6DDFF',
  purple100: '#9B51E0',
  purple80: '#AF74E6',
  purple60: '#C397EC',
  purple40: '#D7B9F3',
  purple20: '#EBDCF9',
  pink100: '#FFB8B8',
  pink80: '#FFC6C6',
  pink60: '#FFD4D4',
  pink40: '#FFE3E3',
  pink20: '#FFF1F1',
  black100: '#000000',
  black80: '#333333',
  black60: '#666666',
  black40: '#999999',
  black20: '#CCCCCC',
  gray100: '#C9C9C9',
  gray80: '#D4D4D4',
  gray60: '#DFDFDF',
  gray40: '#E9E9E9',
  gray20: '#F4F4F4',
  white100: '#FFFFFF',
  white80: '#FCFCFC',
  white60: '#F9F9F9',
  white40: '#F5F5F5',
  white20: '#F2F2F2',
  transparent: 'transparent',
};

const linearGradientColors = {
  purple40deg70blue40: `linear-gradient(70deg, ${colors.purple40} 0%,${colors.blue40} 100%)`,
};

// const colors = {
//   white: '#ffffff',
//   orange: '#333',
//   secondary: '#333',
//   skyblue: '#333',
//   error: '#333',
//   disabled: '#333',
//   danger: '#333',
//   cancel: '#333',
//   border: '#333333',
//   background: '#333',
//   placeholder: '#1D2433',
//   grayLight: '#C2C2C2',
//   gray: '#ADADAD',
//   grayDark: '#999999',
//   default: '#1D2433',
// };
// const backgroundColors = {
//   red: '#EB5757',
//   orange: '#F2994A',
//   yellow: '#F2C94C',
//   green: '#219653',
//   blue: '#2F80ED',
//   skyblue: '#56CCF2',
//   purple: '#9B51E0',
//   pink: '#FFB8B8',
//   white: '#ffffff',
//   disabled: '#D9D9D9',
//   orangeLight: '#FFC266',
//   orangeDark: '#FF9900',
//   purpleLight: '#B29ADA',
//   purpleDark: '#7E57C2',
//   skyblueLight: '#97D4FF',
//   skyblueDark: '#52B8FF',
//   lightredLight: '#FFAA8E',
//   lightred: '#FF8D69',
//   lightredDark: '#FF7143',
//   greenLight: '#74CB85',
//   greenDark: '#18A934',
//   turquoiseLight: '#67E1C2',
//   turquoise: '#34D7AE',
//   turquoiseDark: '#01CD9A',
//   blueLight: '#82B3F4',
//   blueDark: '#2F80ED',
//   yellowLight: '#F7DF94',
//   yellowDark: '#F2C94C',
//   error: 'white',
//   dangerLight: '#FC9372',
//   danger: '#FB6F43',
//   dangerDark: '#FA4B14',
//   cancel: 'black',
//   border: '#999999',
//   placeholder: '#f0f0f0',
//   black: '#333333',
//   white1: '#f2f2f2',
//   white2: '#fafafa',
//   white3: '#f4f5f6',
//   white4: '#f9f9f9',
//   white5: '#f3f5fb',
//   background: '#FFFFFF',
//   background1: '#F4F4F4',
//   /**
//    * @parmas 현재 사용하고 있는 배경색
//    */
//   background2: '#F6EFE5',
//   background3: '#e0e0e0',
//   grayLight: '#C2C2C2',
//   gray: '#ADADAD',
//   grayDark: '#999999',
//   googleCalendarGray: '#f1f3f4',
//   transparent: 'transparent',
// };

// const linearGradientColors = {
//   orange: 'linear-gradient(180deg,rgba(254, 128, 0) 0%,rgba(255, 161, 0) 100%)',
//   red: 'linear-gradient(180deg, rgba(201, 28, 73) 0%, rgba(247, 37, 84) 100%)',
//   purple:
//     'linear-gradient(180deg, rgba(165, 39, 201) 0%, rgba(167, 98, 230) 100%)',
//   turquoise:
//     'linear-gradient(180deg, rgba(5, 156, 139) 0%, rgba(3, 181, 185) 100%)',
//   bluePink:
//     'linear-gradient(180deg, rgba(52, 148, 230) 0%, rgba(236, 110, 173) 100%)',
//   blue: 'linear-gradient(180deg, rgba(0, 108, 209) 0%, rgba(1, 142, 210) 100%)',
//   greenBrightBrown:
//     'linear-gradient(180deg, #rgba(77, 160, 176) 0%, rgba(211, 157, 56) 100%)',
//   redOrange:
//     'linear-gradient(180deg, rgba(253, 45, 1) 0%, rgba(254, 143, 1) 100%)',
//   cottonCandy:
//     'linear-gradient( 90deg, rgba(236, 222, 227, 1) 0%, rgba(222, 220, 233, 1) 20%, rgba(202, 208, 224, 1) 40%, rgba(209, 199, 214, 1) 60%, rgba(239, 199, 200, 1) 80%, rgba(244, 231, 206, 1) 100%)',
//   skyblue: 'linear-gradient(lightCyan, skyBlue, deepSkyBlue)',
// };

const flex = {
  display: 'flex',
  row: {
    display: 'flex',
    between: {
      display: 'flex',
      justifyContent: 'space-between',
      center: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      start: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      },
      end: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      },
    },
    around: {
      display: 'flex',
      justifyContent: 'space-around',
      center: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
    },
    center: {
      display: 'flex',
      justifyContent: 'center',
      center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      between: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'space-between',
      },
    },
    start: {
      display: 'flex',
      flexFlow: 'nowrap row',
      justifyContent: 'flex-start',
    },
    end: {
      display: 'flex',
      justifyContent: 'flex-end',
      center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
    },
    _: {
      display: 'flex',
      flexFlow: 'nowrap row',
      center: {
        display: 'flex',
        alignItems: 'center',
      },
      start: {
        display: 'flex',
        alignItems: 'flex-start',
      },
    },
  },
  column: {
    display: 'flex',
    flexFlow: 'nowrap column',
    center: {
      display: 'flex',
      flexFlow: 'nowrap column',
      justifyContent: 'center',
      center: {
        display: 'flex',
        flexFlow: 'nowrap column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      between: {
        display: 'flex',
        flexFlow: 'nowrap column',
        justifyContent: 'center',
        alignItems: 'space-between',
      },
      end: {
        display: 'flex',
        flexFlow: 'nowrap column',
        justifyContent: 'center',
        alignItems: 'flex-end',
      },
    },
    start: {
      display: 'flex',
      flexFlow: 'nowrap column',
      justifyContent: 'flex-start',
      start: {
        display: 'flex',
        flexFlow: 'nowrap column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
      center: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'nowrap column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
    },
    between: {
      display: 'flex',
      flexFlow: 'nowrap column',
      justifyContent: 'space-between',
    },
    end: {
      display: 'flex',
      flexFlow: 'nowrap column',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    _: {
      start: {
        display: 'flex',
        flexFlow: 'nowrap column',
        alignItems: 'flex-start',
      },
      center: {
        display: 'flex',
        flexFlow: 'nowrap column',
        alignItems: 'center',
      },
    },
  },
};

const grid = {
  column2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  column3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  column4: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
};

const scroll = {
  hidden: {
    overflow: 'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    [`&::-webkit-scrollbar`]: {
      display: 'none',
    },
  },
};

export const commonTheme = {
  fontSize,
  borderRadius,
  padding,
  deviceSizes,
  colors,
  fontFamily,
  btnSizes,
  inputSizes,
  linearGradientColors,
  flex,
  grid,
  calcRem,
  scroll,
  positionStyle,
};

export type purpleThemeType = typeof purpleTheme;

export const darkTheme = {
  main: {
    primary100: colors.black100,
    primary80: colors.black80,
    primary60: colors.black60,
    primary40: colors.black40,
    primary20: colors.black20,
    secondary100: colors.gray100,
    secondary80: colors.gray80,
    secondary60: colors.gray60,
    secondary40: colors.gray40,
    secondary20: colors.gray20,
    third100: colors.orange100,
    third80: colors.orange80,
    third60: colors.orange60,
    third40: colors.orange40,
    third20: colors.orange20,
    contrast: colors.white80,
  },
  ...commonTheme,
};

export const purpleTheme = {
  main: {
    primary100: colors.purple100,
    primary80: colors.purple80,
    primary60: colors.purple60,
    primary40: colors.purple40,
    primary20: colors.purple20,
    secondary100: colors.blue100,
    secondary80: colors.blue80,
    secondary60: colors.blue60,
    secondary40: colors.blue40,
    secondary20: colors.blue20,
    third100: colors.orange100,
    third80: colors.orange80,
    third60: colors.orange60,
    third40: colors.orange40,
    third20: colors.orange20,
    contrast: colors.white80,
  },
  ...commonTheme,
};

const rootTheme: purpleThemeType = {
  darkTheme,
  purpleTheme,
};

export default rootTheme;
