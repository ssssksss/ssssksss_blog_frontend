import { ReactNode } from "react";

export interface IModalButtonProps {
  onClick?: (_event: unknown) => void;
  onClickCapture?: (_event: unknown) => void;
  children: ReactNode;
  disabled?: boolean;
  w?: string;
  h?: string;
  bg?: string | number;
  brR?: string;
  color?: string;
  pd?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  outline?: boolean | string | number;
  outlineColor?: string;
  fontFamily?: string;
  fontWeight?: number;
  state?: number;
  active?: boolean;
  modal?: ReactNode;
  modalW?: string;
  modalMinW?: string;
  modalMaxW?: string;
  modalH?: string;
  modalMinH?: string;
  modalMaxH?: string;
  modalOverlayVisible?: boolean;
  modalBg?: string;
  beforeCloseFunction?: () => void;
}