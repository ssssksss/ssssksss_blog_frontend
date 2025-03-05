import React from "react";

type BasicInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const BasicInput: React.FC<BasicInputProps> = ({className, ...props}) => {
  return (
    <input
      className={`bg-default-1 primary-outline ${className}`}
      {...props}
    />
  );
};

export default BasicInput;
