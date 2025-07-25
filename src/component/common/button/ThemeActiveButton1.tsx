import BasicButton from "./hybrid/BasicButton";

const ThemeActiveButton1 = ({
  className,
  isActive,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {className?: string, isActive?: boolean}) => {
  return (
    <BasicButton
      role="button"
      aria-pressed={isActive}
      className={`disabled:cursor-not-allowed disabled:disabled-set default-flex ${className} ${className?.includes("rounded") ? "primary-border" : "primary-border-radius"} ${isActive ? "font-bold bg-primary-80" : "hover:scale-105"}`}
      {...props}
    />
  );
};

export default ThemeActiveButton1;
