import { AiOutlineCloseCircle } from "react-icons/ai";

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
      <AiOutlineCloseCircle size={"48"} />
    </button>
  );
};
export default AbsoluteCloseButton;