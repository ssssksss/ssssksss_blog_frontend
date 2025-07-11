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
      className={className}
      onClick={handleClick}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <div className="h-full py-1 default-flex">
          <div className="border-white-500 aspect-square h-full animate-spin rounded-full border-b-2"></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default BasicButton;
