// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/component/**/view/**/*.{ts,tsx}',
    './src/component/**/hybrid/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        primary: '1rem',
      },
      colors: {
        primary: {
          100: '#9B51E0',
          80: '#AF74E6',
          60: '#C397EC',
          40: '#D7B9F3',
          20: '#EBDCF9',
        },
        secondary: {
          100: '#3454FF',
          80: '#5D76FF',
          60: '#8598FF',
          40: '#AEBBFF',
          20: '#D6DDFF',
        },
        third: {
          100: '#FF9900',
          80: '#FFAD33',
          60: '#FFC266',
          40: '#FFD699',
          20: '#FFEBCC',
        },
        red: {
          100: '#FF0000',
          80: '#FF3333',
          60: '#FF6666',
          40: '#FF9999',
          20: '#FFCCCC',
        },
        orange: {
          100: '#FF9900',
          80: '#FFAD33',
          60: '#FFC266',
          40: '#FFD699',
          20: '#FFEBCC',
        },
        yellow: {
          100: '#FAFF00',
          80: '#FBFF33',
          60: '#FCFF66',
          40: '#FDFF99',
          20: '#FEFFCC',
        },
        green: {
          100: '#18A934',
          80: '#46BA5D',
          60: '#74CB85',
          40: '#A3DDAE',
          20: '#D1EED6',
        },
        skyblue: {
          100: '#56CCF2',
          80: '#78D6F5',
          60: '#9AE0F7',
          40: '#BBEBFA',
          20: '#DDF5FC',
        },
        blue: {
          100: '#3454FF',
          80: '#5D76FF',
          60: '#8598FF',
          40: '#AEBBFF',
          20: '#D6DDFF',
        },
        purple: {
          100: '#9B51E0',
          80: '#AF74E6',
          60: '#C397EC',
          40: '#D7B9F3',
          20: '#EBDCF9',
        },
        pink: {
          100: '#FFB8B8',
          80: '#FFC6C6',
          60: '#FFD4D4',
          40: '#FFE3E3',
          20: '#FFF1F1',
        },
        black: {
          100: '#000000',
          80: '#333333',
          60: '#666666',
          40: '#999999',
          20: '#CCCCCC',
        },
        gray: {
          100: '#C9C9C9',
          80: '#D4D4D4',
          60: '#DFDFDF',
          40: '#E9E9E9',
          20: '#F4F4F4',
        },
        white: {
          100: '#FFFFFF',
          80: '#FCFCFC',
          60: '#F9F9F9',
          40: '#F5F5F5',
          20: '#F2F2F2',
        },
        gradient: {
          purple: {
            40: {
              deg: {
                70: {
                  blue: {
                    40: `linear-gradient(70deg, #D7B9F3 0%,#AEBBFF 100%)`,
                  },
                },
              },
            },
          },
        },
      },
      animation: {
        marquee: 'marquee 15s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};