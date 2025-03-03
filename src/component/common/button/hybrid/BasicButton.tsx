import React from "react";

const themes: Record<number, string> = {
  1: "primary-set disabled:bg-black-40 disabled:cursor-not-allowed rounded-[1rem]",
  2: "secondary-set",
  3: "third-set",
};


interface IBasicButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: number,
}

const BasicButton: React.FC<IBasicButton> = ({
  className,
  children,
  theme,
  ...props
}) => {
  return (
    <button className={`${theme && themes[theme]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default BasicButton;
