import BasicButton from "./hybrid/BasicButton";

const ThemeActiveButton2 = ({
  className,
  isActive,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {className?: string, isActive?: boolean}) => {
  return (
    <BasicButton
      role="button"
      aria-pressed={isActive}
      className={`default-flex disabled:cursor-not-allowed disabled:disabled-set ${className} ${className?.includes("rounded") ? "seconde-border" : "seconde-border-radius"} ${isActive ? "bg-secondary-80 font-bold" : "hover:scale-105"}`}
      {...props}
    />
  );
};

export default ThemeActiveButton2;
