export interface IConfirmButtonProps {
  onClick?: (_event?: unknown) => void;
  onClickCapture?: (_event: unknown) => void;
  children: ReactNode;
  disabled?: boolean;
  w?: string;
  h?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
  minW?: string;
  minH?: string;
  bg?: Partial<colorTypes | themeTypes> | number | string;
  brR?: string; // border-radius
  pd?: string;
  color?: Partial<colorTypes | themeTypes>;
  outline?: boolean | string | number;
  outlineColor?: Partial<colorTypes | themeTypes>;
  fontFamily?: string;
  fontWeight?: number;
  state?: 'danger' | 'warning' | number;
  active?: boolean;
  activeBg?: string;
  hover?: boolean;
  badgeValue?: number | string;
  icon?: 'warning' | 'error' | 'success' | 'info' | 'question';
  title?: string;
  text?: string;
  children?: React.ReactNode;
}
