import React from "react";

type BasicTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const BasicTextarea: React.FC<BasicTextareaProps> = ({className, ...props}) => {
  return (
    <textarea
      className={`dynamic-opacity bg-default-1 bg-gray-40 ${className}`}
      {...props}
    />
  );
};

export default BasicTextarea;
