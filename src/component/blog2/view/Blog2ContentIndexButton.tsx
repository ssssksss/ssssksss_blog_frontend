import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IBlog2ContentIndexButton {
  openModal: () => void;

}
const Blog2ContentIndexButton = (props: IBlog2ContentIndexButton) => {
  return (
    <div className="sticky left-[100%] top-[4.5rem] z-10 h-0 w-0">
      <button
        onClick={() => props.openModal()}
        className={
          "absolute right-[0rem] top-0 z-20 flex h-[2.5rem] w-[2.5rem] bg-primary-20 default-outline default-flex"
        }
      >
        <FontAwesomeIcon icon={faBars} className="text-[2rem] w-[28px] h-[32px]" />
      </button>
    </div>
  );
};
export default Blog2ContentIndexButton;