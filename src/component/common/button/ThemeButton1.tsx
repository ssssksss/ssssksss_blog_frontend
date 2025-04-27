import BasicButton from "./hybrid/BasicButton";

const ThemeButton1 = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {className?: string}) => {
  return (
    <BasicButton
      className={`primary-border-radius primary-set hover:scale-105 disabled:cursor-not-allowed disabled:disabled-set ${className}`}
      {...props}
    />
  );
};

export default ThemeButton1;
