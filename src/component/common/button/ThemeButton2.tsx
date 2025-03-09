import BasicButton from "./hybrid/BasicButton";

const ThemeButton2 = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {className: string}) => {
  return (
    <BasicButton
      className={`secondary-border-radius secondary-set hover:bg-secondary-20 disabled:cursor-not-allowed disabled:bg-black-40 ${className}`}
      {...props}
    />
  );
};

export default ThemeButton2;
