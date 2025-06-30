import { AiOutlineCloseCircle } from "react-icons/ai";

interface IAbsoluteCloseButton {
    onClick: () => void;
  className?: string;
  size?: string;
}
const AbsoluteCloseButton = (props: IAbsoluteCloseButton) => {
  return (
    <button
      onClick={() => props.onClick()}
      className={`absolute scale-100 transform transition-transform duration-300 ${props.className || ""}`}
      style={{ zIndex: 200 }}
    >
      <AiOutlineCloseCircle size={props.size || "48"} />
    </button>
  );
};
export default AbsoluteCloseButton;