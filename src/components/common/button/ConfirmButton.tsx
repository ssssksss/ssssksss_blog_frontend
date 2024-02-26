import Button from '@components/common/button/Button';
import styled from '@emotion/styled';
import { MouseEventHandler, ReactNode, useCallback } from 'react';
import Swal from 'sweetalert2';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ConfirmButton.tsx
 * @version 0.0.1 "2024-02-15 20:37:45"
 * @description 설명
 */
interface ButtonProps {
  onClick?: (_event: any) => void;
  onClickCapture?: (_event: any) => void;
  children: ReactNode;
  disabled?: boolean;
  w?: string;
  h?: string;
  bg?: string;
  brR?: string; // border-radius
  color?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  outline?: boolean;
  outlineColor?: string;
  fontFamily?: string;
  fontWeight?: number;
  state?: number;
  active?: boolean;
  activeBg?: string;
  hover?: boolean;
  //
  icon?: 'warning' | 'error' | 'success' | 'info' | 'question';
  title?: string;
  text?: string;
}

export const ConfirmButton = ({
  onClick: _onClick,
  onClickCapture: _onClickCapture,
  children = 'button',
  ...props
}: ButtonProps) => {
  const showSwal = () => {
    Swal.fire({
      titleText: props.text || 'Do you want to continue',
      icon: props.icon || 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '승인',
      cancelButtonText: '취소',
    }).then((res) => {
      if (res.isConfirmed) _onClick?.(event);
    });
  };

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (props.disabled) return;
      showSwal();
      event.stopPropagation();
    },
    [_onClick, props.disabled],
  );

  return (
    <Container onClick={onClick} {...props}>
      {children}
    </Container>
  );
};

const Container = styled(Button)`
  outline: none;
`;
