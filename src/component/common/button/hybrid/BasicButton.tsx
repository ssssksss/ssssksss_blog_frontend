"use client";

import React, { useState } from "react";
interface IBasicButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  showLoadingOnClick?: boolean;
}

const BasicButton: React.FC<IBasicButton> = ({
  children,
  className,
  onClick,
  showLoadingOnClick = false,
  ...props
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setLoading(true);
    try {
      await onClick!(e);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={className + " relative"}
      onClick={handleClick}
      disabled={loading || props.disabled}
      {...props}
    >
      <span className={loading ? "invisible" : ""}>{children}</span>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="aspect-square h-4 animate-spin rounded-full border-b-4 border-blue-500"></div>
        </div>
      )}
    </button>
  );
};

export default BasicButton;