import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

interface IBackButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: string;
}
const BackButton = (props: IBackButton) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className={`relative aspect-square text-contrast-1 primary-border-radius default-flex hover:bg-primary-80 ${props.className || ""}`}
      aria-label="뒤로가기 버튼"
    >
      <IoMdArrowRoundBack size={props.size || "28"} />
    </button>
  );
};
export default BackButton;