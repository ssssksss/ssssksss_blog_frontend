import { SendHorizontal } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface ISubmitButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isActive: boolean;
}
const SubmitButton = (props: ISubmitButton) => {
  return (
    <button
      role="button"
      aria-pressed={props.isActive}
      className={`disabled:cursor-not-allowed disabled:bg-black-40 ${props.className} ${props.className?.includes("rounded") ? "primary-border" : "primary-border-radius"} ${props.isActive ? "font-bold primary-set" : "hover:bg-primary-20"}`}
      {...props}
    >
      <SendHorizontal size="24" />
    </button>
  );
};
export default SubmitButton;