import { ChangeEvent, forwardRef, MouseEventHandler } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IInput {
  type?: string;
  ref?: React.MutableRefObject<HTMLInputElement>;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (_e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPressAction?: (_e: React.KeyboardEvent<HTMLInputElement>) => void;
  register?: UseFormRegisterReturn<string>;
  errorMessage?: string;
  id?: string;
  accept?: string;
  maxLength?: number;
  disabled?: boolean;
  style?: object;
  onClick?: MouseEventHandler<HTMLInputElement>;
}
const Input = forwardRef<HTMLInputElement, IInput>(
  (
    {
      type = "text",
      className,
      placeholder,
      onChange,
      defaultValue,
      value,
      register,
      onKeyPressAction,
      accept,
      id,
      maxLength,
      errorMessage,
      disabled,
      style,
      onClick,
    },
    ref,
  ) => {
    return (
      <input
        onChange={(e) => {
          if (register) {
            // ? react-hook-form 사용시 필요한 코드
            register.onChange(e);
          }
          if (onChange) {
            onChange(e);
          }
        }}
        defaultValue={defaultValue}
        type={type}
        value={value}
        ref={ref}
        id={id}
        maxLength={maxLength}
        accept={accept}
        placeholder={placeholder}
        style={style}
        onClick={onClick || (() => "")}
        className={`bg-default-1 h-full p-2 primary-border ${className} `}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" && onKeyPressAction) {
            onKeyPressAction(e);
          }
        }}
        disabled={!!disabled}
        {...register}
      />
    );
  },
);
Input.displayName = "Input";
export default Input;
