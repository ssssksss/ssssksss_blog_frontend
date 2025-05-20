import BasicButton from "./hybrid/BasicButton";

const ThemeActiveButton3 = ({
  className,
  isActive,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {className?: string, isActive?: boolean}) => {
  return (
    <BasicButton
      role="button"
      aria-pressed={isActive}
      className={`disabled:cursor-not-allowed disabled:bg-black-40 ${className} ${className?.includes("rounded") ? "third-border" : "third-border-radius"} ${isActive ? "font-bold third-set" : "hover:bg-third-20"}`}
      {...props}
    />
  );
};

export default ThemeActiveButton3;
