declare interface IButtonProps {
  onClick?: (_event: unknown) => void;
  onClickCapture?: (_event: unknown) => void;
  children: ReactNode;
  disabled?: boolean;
  w?: string;
  h?: "xs" | "sm" | "md" | "lg" | "xl" | string;
  minW?: string;
  minH?: string;
  bg?: Partial<colorTypes | themeTypes> | number;
  brR?: string; // border-radius
  mg?: string;
  pd?: string;
  color?: Partial<colorTypes | themeTypes>;
  outline?: boolean | string | number;
  outlineColor?: Partial<colorTypes | themeTypes>;
  fontFamily?: string;
  fontWeight?: number;
  state?: "danger" | "warning" | number;
  active?: boolean;
  activeBg?: string;
  activeColor?: string;
  hover?: boolean;
  hoverBg?: Partial<colorTypes | themeTypes>;
  badgeValue?: number | string;
  className?: string;
  id?: string;
}
