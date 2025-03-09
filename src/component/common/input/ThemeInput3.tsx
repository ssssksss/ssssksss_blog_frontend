import { UseFormRegisterReturn } from "react-hook-form";
import BasicInput from "./BasicInput";

const ThemeInput3 = ({
  className,
  register,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegisterReturn<string>;
}) => {
  return (
    <BasicInput
      className={`third-border-radius p-2 focus:bg-third-20 ${className}`}
      register={register}
      {...props}
    />
  );
};

export default ThemeInput3;
