"use client";

import { SendHorizontal } from "lucide-react";
import { ButtonHTMLAttributes, useState } from "react";

interface ISubmitButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isActive: boolean;
  size?: string;
  disabled?: boolean;
  text?: string; // 아이콘 대신에 텍스트로 사용하려면
}
const SubmitButton = ({ isActive, className, size = "24", onClick, disabled, text, ...rest }: ISubmitButton) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) return;
    try {
      setLoading(true);
      if (onClick) await onClick(e); // ✅ 이벤트 전달
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      role="button"
      aria-pressed={isActive}
      aria-busy={loading}
      className={`disabled:cursor-not-allowed disabled:bg-black-40 ${className} ${className?.includes("rounded") ? "primary-border" : "primary-border-radius"} ${isActive ? "font-bold primary-set" : "hover:bg-primary-20"}`}
      disabled={loading}
      onClick={handleConfirm}
      {...rest}
    >
      {loading ? (
        <div className="h-full py-1 default-flex">
          <div className="border-white-500 aspect-square h-full animate-spin rounded-full border-2 border-t-transparent"></div>
        </div>
      ) : (
        text ??
            <SendHorizontal size={`${size || "24"}`} />
      )}
    </button>
  );
};
export default SubmitButton;