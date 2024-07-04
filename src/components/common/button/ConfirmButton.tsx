import Button from '@components/common/button/Button';
import { MouseEventHandler, useCallback } from 'react';
import { IConfirmButtonProps } from 'src/@types/component/common/ConfirmButton';
import Swal from 'sweetalert2';

export const ConfirmButton = ({
  onClick: _onClick,
  children = 'button',
  ...props
}: IConfirmButtonProps) => {
  const showSwal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
      if (res.isConfirmed) {
        event.stopPropagation();
        _onClick?.(event);
      } else if (res.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (props.disabled) return;
      showSwal(event);
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
