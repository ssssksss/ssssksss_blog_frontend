import BasicButton from "./hybrid/BasicButton";

const ThemeActiveButton1 = ({
  className,
  isActive,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {className?: string, isActive: boolean}) => {
  return (
    <BasicButton
      role="button"
      aria-pressed={isActive}
      className={`default-flex disabled:cursor-not-allowed disabled:disabled-set ${className} ${className?.includes("rounded") ? "primary-border" : "primary-border-radius"} ${isActive ? "bg-primary-80 font-bold" : ""}`}
      {...props}
    />
  );
};

export default ThemeActiveButton1;
