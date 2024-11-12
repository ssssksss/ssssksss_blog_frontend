import Image from "next/image";

interface IAbsoluteCloseButton {
    onClick: () => void;
  className?: string;
}
const AbsoluteCloseButton = (props: IAbsoluteCloseButton) => {
  return (
    <button
      onClick={() => props.onClick()}
      className={`absolute h-[2rem] w-[2rem] scale-100 transform transition-transform duration-300 ${props.className ? props.className : "top-[2rem] right-[2rem]"}`}
      style={{ zIndex: 200 }}
    >
      <Image
        src={"/images/icons/ic-exit.svg"}
        alt={"close-icon"}
        width={48}
        height={48}
      />
    </button>
  );
};
export default AbsoluteCloseButton;