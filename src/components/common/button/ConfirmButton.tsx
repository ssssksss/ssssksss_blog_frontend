import Button from '@components/common/button/Button';
import { MouseEventHandler, useCallback } from 'react';
import { IConfirmButtonProps } from 'src/@types/component/common/ConfirmButton';
import Swal from 'sweetalert2';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ConfirmButton.tsx
 * @version 0.0.1 "2024-02-15 20:37:45"
 * @description 설명
 */

export const ConfirmButton = ({
  onClick: _onClick,
  // onClickCapture: _onClickCapture,
  children = 'button',
  ...props
}: IConfirmButtonProps) => {
  const showSwal = () => {
    Swal.fire({
      titleText: props.text || 'Do you want to continue',
      icon: props.icon || 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '승인',
      cancelButtonText: '취소',
      width: '30rem',
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
    <Button onClick={onClick} {...props}>
      {children}
    </Button>
  );
};

