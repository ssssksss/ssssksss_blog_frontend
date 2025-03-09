import React from "react";
interface IBasicButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const BasicButton: React.FC<IBasicButton> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default BasicButton;
