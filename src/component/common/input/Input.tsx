import { ChangeEvent } from "react";
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
}
const Input = ({
  type = 'text',
  ref,
  className,
  placeholder,
  onChange,
  defaultValue,
  value,
  register,
  onKeyPressAction,
  errorMessage,
}: IInput) => {
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
      placeholder={placeholder}
      className={`w-full h-full p-2 rounded-xl bg-transparent outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20 ${className}`}
      onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onKeyPressAction) {
          onKeyPressAction(e);
        }
      }}
      {...register}
    />
  );
};
export default Input