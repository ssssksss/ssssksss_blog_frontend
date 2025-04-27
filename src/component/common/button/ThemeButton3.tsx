import BasicButton from "./hybrid/BasicButton";

const ThemeButton3 = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {className: string}) => {
  return (
    <BasicButton
      className={`third-border-radius third-set hover:scale-110 hover:bg-third-20 disabled:cursor-not-allowed disabled:bg-black-40 ${className}`}
      {...props}
    />
  );
};

export default ThemeButton3;
