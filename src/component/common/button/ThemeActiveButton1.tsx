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
      className={`disabled:cursor-not-allowed disabled:bg-black-40 ${className} ${className?.includes("rounded") ? "primary-border" : "primary-border-radius"} ${isActive ? "font-bold primary-set" : "hover:bg-primary-20"}`}
      {...props}
    />
  );
};

export default ThemeActiveButton1;
