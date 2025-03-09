import React from "react";

type BasicInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const BasicInput = React.forwardRef<HTMLInputElement, BasicInputProps>(
  ({className, ...props}, ref) => {
    return (
      <input
        ref={ref}
        className={`placeholder:text-contrast-1 bg-default-1 primary-outline ${className}`}
        {...props}
      />
    );
  },
);

BasicInput.displayName = "BasicInput";

export default BasicInput;
