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
      className={`disabled:cursor-not-allowed disabled:bg-black-40 ${className} ${className?.includes("rounded") ? "seconde-border" : "seconde-border-radius"} ${isActive ? "font-bold seconde-set" : "hover:scale-105"}`}
      {...props}
    />
  );
};

export default ThemeActiveButton2;
