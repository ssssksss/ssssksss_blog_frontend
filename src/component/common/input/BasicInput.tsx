import React from "react";

type BasicInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const BasicInput: React.FC<BasicInputProps> = ({className, ...props}) => {
  return (
    <input
      className={`dynamic-opacity bg-default-1 bg-gray-40 ${className}`}
      {...props}
    />
  );
};

export default BasicInput;
