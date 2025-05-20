import React from "react";

type BasicTextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "className"
> & {
  className?: string;
};

const BasicTextarea = React.forwardRef<HTMLTextAreaElement, BasicTextareaProps>(
  ({className, ...props}, ref) => {
    return (
      <textarea
        ref={ref}
        className={`resize-none bg-default-1 focus:outline-none ${className ?? ""}`}
        {...props}
      />
    );
  },
);

BasicTextarea.displayName = "BasicTextarea";

export default BasicTextarea;
