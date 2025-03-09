import { UseFormRegisterReturn } from "react-hook-form";
import BasicInput from "./BasicInput";

const ThemeInput2 = ({
  className,
  register,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegisterReturn<string>;
}) => {
  return (
    <BasicInput
      className={`secondary-border-radius p-2 focus:bg-secondary-20 ${className}`}
      register={register}
      {...props}
    />
  );
};

export default ThemeInput2;
