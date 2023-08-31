/**
 * Author : Sukyung Lee
 * FileName: theme.ts
 * Date: 2022-07-02 02:09:11
 * Description : 공통적인 스타일을 지정하여 일관성있는 스타일을 보여주기 위해 작성
 */

// 폰트를 rem으로 계산
const calcRem = (size: number) => `${size / 16}rem`;

// 폰트 사이즈
const fontSizes = {
  xs: `${calcRem(10)}`,
  sm: `${calcRem(12)}`,
  md: `${calcRem(16)}`,
  lg: `${calcRem(20)}`,
  xl: `${calcRem(24)}`,
};

const borderRadius = {
  xs: `${calcRem(4)}`,
  sm: `${calcRem(8)}`,
  md: `${calcRem(12)}`,
  lg: `${calcRem(16)}`,
  xl: `${calcRem(20)}`,
};

const padding = {
  xs: `${calcRem(4)}`,
  sm: `${calcRem(8)}`,
  md: `${calcRem(12)}`,
  lg: `${calcRem(16)}`,
  xl: `${calcRem(20)}`,
};

const height = {
  xs: '40px',
  sm: '60px',
  md: '80px',
  lg: '100px',
  xl: '120px',
};

const deviceSizes = {
  mobile: '360px',
  tablet: '768px',
  laptop: '1024px',
  maxWidth: '1024px',
};

const customScreen = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  maxWidth: '1440px',
  phone: '360px',
  tablet: '768px',
  desktop: '1024px',
};

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (min-width: ${deviceSizes.tablet})`,
};

const fontFamily = {
  cookieRunOTFBlack: 'cookieRunOTFBlack',
  cookieRunRegular: 'cookieRunRegular',
  gmarketSansBold: 'gmarketSansBold',
};

const btnSizes = {
  xs: {
    width: '60px',
    height: '40px',
    borderRadius: '2px',
  },
  sm: {
    width: '80px',
    height: '60px',
    borderRadius: '5px',
  },
  md: {
    width: '100px',
    height: '60px',
    borderRadius: '10px',
  },
  lg: {
    width: '120px',
    height: '60px',
    borderRadius: '20px',
  },
  xl: {
    width: '100em',
    height: '60px',
    borderRadius: '20px',
  },
};

const inputSizes = {
  text: {
    xs: {
      width: '100%',
      height: '40px',
    },
    sm: {
      width: '40em',
      height: '40px',
    },
    md: {
      width: '60em',
      height: '40px',
    },
    lg: {
      width: '80em',
      height: '40px',
    },
    xl: {
      width: '100em',
      height: '40px',
    },
  },
  password: {
    xs: {
      width: '100%',
      height: '40px',
    },
    sm: {
      width: '40em',
      height: '40px',
    },
    md: {
      width: '60em',
      height: '40px',
    },
    lg: {
      width: '80em',
      height: '40px',
    },
    xl: {
      width: '100em',
      height: '40px',
    },
  },
  email: {
    xs: {
      width: '100%',
      height: '40px',
    },
    sm: {
      width: '40em',
      height: '40px',
    },
    md: {
      width: '60em',
      height: '40px',
    },
    lg: {
      width: '80em',
      height: '40px',
    },
    xl: {
      width: '100em',
      height: '40px',
    },
  },
  search: {
    xs: {
      width: '100%',
      height: '40px',
    },
    sm: {
      width: '40em',
      height: '40px',
    },
    md: {
      width: '60em',
      height: '40px',
    },
    lg: {
      width: '80em',
      height: '40px',
    },
    xl: {
      width: '100em',
      height: '40px',
    },
  },
  radio: {
    xs: {
      width: '16px',
      height: '16px',
    },
    sm: {
      width: '20px',
      height: '20px',
    },
    md: {
      width: '24px',
      height: '24px',
    },
    lg: {
      width: '32px',
      height: '32px',
    },
    xl: {
      width: '40px',
      height: '40px',
    },
  },
  checkbox: {
    xs: {
      width: '16px',
      height: '16px',
    },
    sm: {
      width: '20px',
      height: '20px',
    },
    md: {
      width: '24px',
      height: '24px',
    },
    lg: {
      width: '32px',
      height: '32px',
    },
    xl: {
      width: '40px',
      height: '40px',
    },
  },
};

// 색깔
const colors = {
  white: '#ffffff',
  orange: '#333',
  secondary: '#333',
  skyblue: '#333',
  error: '#333',
  disabled: '#333',
  danger: '#333',
  cancel: '#333',
  border: '#333333',
  background: '#333',
  placeholder: '#1D2433',
  grayLight: '#C2C2C2',
  gray: '#ADADAD',
  grayDark: '#999999',
  default: '#1D2433',
};
const backgroundColors = {
  red: '#EB5757',
  orange: '#F2994A',
  yellow: '#F2C94C',
  green: '#219653',
  blue: '#2F80ED',
  skyblue: '#56CCF2',
  purple: '#9B51E0',
  pink: '#FFB8B8',
  white: '#ffffff',
  disabled: '#D9D9D9',
  orangeLight: '#FFC266',
  orangeDark: '#FF9900',
  purpleLight: '#B29ADA',
  purpleDark: '#7E57C2',
  skyblueLight: '#97D4FF',
  skyblueDark: '#52B8FF',
  lightredLight: '#FFAA8E',
  lightred: '#FF8D69',
  lightredDark: '#FF7143',
  greenLight: '#74CB85',
  greenDark: '#18A934',
  turquoiseLight: '#67E1C2',
  turquoise: '#34D7AE',
  turquoiseDark: '#01CD9A',
  blueLight: '#82B3F4',
  blueDark: '#2F80ED',
  yellowLight: '#F7DF94',
  yellowDark: '#F2C94C',
  error: 'white',
  dangerLight: '#FC9372',
  danger: '#FB6F43',
  dangerDark: '#FA4B14',
  cancel: 'black',
  border: '#999999',
  placeholder: '#f0f0f0',
  black: '#333333',
  white1: '#f2f2f2',
  white2: '#fafafa',
  white3: '#f4f5f6',
  white4: '#f9f9f9',
  white5: '#f3f5fb',
  background: '#FFFFFF',
  background1: '#F4F4F4',
  /**
   * @parmas 현재 사용하고 있는 배경색
   */
  background2: '#F6EFE5',
  background3: '#e0e0e0',
  grayLight: '#C2C2C2',
  gray: '#ADADAD',
  grayDark: '#999999',
  googleCalendarGray: '#f1f3f4',
  transparent: 'transparent',
};

const linearGradientColors = {
  orange: 'linear-gradient(180deg,rgba(254, 128, 0) 0%,rgba(255, 161, 0) 100%)',
  red: 'linear-gradient(180deg, rgba(201, 28, 73) 0%, rgba(247, 37, 84) 100%)',
  purple:
    'linear-gradient(180deg, rgba(165, 39, 201) 0%, rgba(167, 98, 230) 100%)',
  turquoise:
    'linear-gradient(180deg, rgba(5, 156, 139) 0%, rgba(3, 181, 185) 100%)',
  bluePink:
    'linear-gradient(180deg, rgba(52, 148, 230) 0%, rgba(236, 110, 173) 100%)',
  blue: 'linear-gradient(180deg, rgba(0, 108, 209) 0%, rgba(1, 142, 210) 100%)',
  greenBrightBrown:
    'linear-gradient(180deg, #rgba(77, 160, 176) 0%, rgba(211, 157, 56) 100%)',
  redOrange:
    'linear-gradient(180deg, rgba(253, 45, 1) 0%, rgba(254, 143, 1) 100%)',
  cottonCandy:
    'linear-gradient( 90deg, rgba(236, 222, 227, 1) 0%, rgba(222, 220, 233, 1) 20%, rgba(202, 208, 224, 1) 40%, rgba(209, 199, 214, 1) 60%, rgba(239, 199, 200, 1) 80%, rgba(244, 231, 206, 1) 100%)',
};

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
    },
  },
};

const theme = {
  fontSizes,
  colors,
  flex,
  backgroundColors,
  deviceSizes,
  device,
  fontFamily,
  linearGradientColors,
  /**
   * @Params sm:576, md:768, lg:992, xl:1200, maxWidth:1440, phone:360, tablet:768, desktop:1024
   */
  customScreen,
  borderRadius,
  padding,
  height,
  btnSizes,
  inputSizes,
};

export default theme;
