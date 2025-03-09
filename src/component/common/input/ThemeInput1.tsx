import { forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import BasicInput from "./BasicInput";

const ThemeInput1 = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    register?: UseFormRegisterReturn<string>;
  }
>(({className, register, ...props}, ref) => {
  return (
    <BasicInput
      className={`primary-border-radius p-2 focus:bg-primary-20 ${className}`}
      ref={register?.ref || ref}
      {...register}
      {...props}
    />
  );
});

export default ThemeInput1;
