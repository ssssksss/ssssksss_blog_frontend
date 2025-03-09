import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type BasicInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegisterReturn<string>; // react-hook-form을 사용할 경우
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
        className={`placeholder:text-contrast-1 bg-default-1 p-2 focus:outline-none disabled:placeholder:text-primary-contrast disabled:bg-black-60 ${className}`}
        {...register}
        {...props}
      />
    );
  },
);

BasicInput.displayName = "BasicInput";

export default BasicInput;
