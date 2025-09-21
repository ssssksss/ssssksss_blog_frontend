import BasicButton from "./hybrid/BasicButton";

const ActiveButton = ({
  className,
  isActive,
  isActiveBg,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {className?: string, isActive: boolean, isActiveBg: string}) => {
  return (
    <BasicButton
      role="button"
      aria-pressed={isActive}
      className={`default-flex disabled:cursor-not-allowed disabled:disabled-set ${className} ${className?.includes("rounded") ? "border border-contrast-1" : "border border-contrast-1"} ${isActive ? `font-bold ${isActiveBg ?? ""}` : ""}`}
      {...props}
    />
  );
};

export default ActiveButton;
