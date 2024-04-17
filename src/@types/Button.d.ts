import { colorTypes, themeTypes } from '@styles/theme';
import { ReactNode } from 'react';

declare module ButtonTypes {
  export interface IButtonProps {
    onClick?: (_event: unknown) => void;
    onClickCapture?: (_event: unknown) => void;
    children: ReactNode;
    disabled?: boolean;
    w?: string;
    h?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
    minW?: string;
    minH?: string;
    bg?: Partial<colorTypes | themeTypes>;
    brR?: string; // border-radius
    pd?: string;
    color?: Partial<colorTypes | themeTypes>;
    outline?: boolean;
    outlineColor?: Partial<colorTypes | themeTypes>  ;
    fontFamily?: string;
    fontWeight?: number;
    state?: 'danger' | 'warning';
    active?: boolean;
    activeBg?: string;
    hover?: boolean;
    badgeValue?: number | string;
  }
}
