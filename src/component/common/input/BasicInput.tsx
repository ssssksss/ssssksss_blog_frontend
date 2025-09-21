import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type BasicInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegisterReturn<string>; // react-hook-form을 사용할 경우
  onKeyPressAction?: (_e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const BasicInput = React.forwardRef<HTMLInputElement, BasicInputProps>(
  ({className, register, ...props}, ref) => {
    return (
      <input
        ref={ref}
        onChange={(e) => {
          if (register) {
            // ? react-hook-form 사용시 필요한 코드
            register.onChange(e);
          }
          if (props.onChange) {
            props.onChange(e);
          }
        }}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" && props.onKeyPressAction) {
            props.onKeyPressAction(e);
          }
        }}
        className={`bg-default-1 p-2 placeholder:text-contrast-1 placeholder:text-sm focus:outline-none disabled:cursor-none disabled:disabled-set disabled:placeholder:text-primary-contrast cursor-pointer ${className || ""}`}
        {...register}
        {...props}
      />
    );
  },
);

BasicInput.displayName = "BasicInput";

export default BasicInput;
