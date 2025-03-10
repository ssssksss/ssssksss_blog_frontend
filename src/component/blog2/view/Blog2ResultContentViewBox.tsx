import LottieNotFound from "@component/common/lottie/LottieNotFound";
import useModalState from "@hooks/useModalState";
import { useScrollToHash } from "@hooks/useScrollToHash";
import "@styles/customEditor.css";
import {
  EditorLiStyle,
  EditorUlStyle
} from "@utils/editor/EditorTailwindcssStyle";
import Blog2ContentIndexBox from "./Blog2ContentIndexBox";
import Blog2ContentIndexButton from "./Blog2ContentIndexButton";
import Blog2ResultContentViewItem from "./Blog2ResultContentViewItem";

interface IBlog2ResultContentViewBox {
  data: IBlog2Result[];
}
const Blog2ResultContentViewBox = (props: IBlog2ResultContentViewBox) => {
  const modalState = useModalState();
  useScrollToHash();

  if (props.data.length == 0) {
    return (
      <div className={"relative flex w-full flex-col rounded-[1rem] p-0"}>
        {
          <div className="flex w-full flex-col items-center">
            <LottieNotFound text={"정보가 없습니다."} />
          </div>
        }
      </div>
    );
  }

  return (
    <div className={"relative flex w-full flex-col rounded-[1rem] p-0"}>
      {modalState.isOpen && (
        <Blog2ContentIndexBox
          data={props.data}
          closeModal={() => modalState.closeModal()}
        />
      )}
      {!modalState.isOpen && (
        <Blog2ContentIndexButton openModal={() => modalState.openModal()} />
      )}
      <ul className={EditorUlStyle} id={"previewList"}>
        <>
          {props.data.map((i: IBlog2Result) => (
            <li key={i.id} className={EditorLiStyle}>
              <Blog2ResultContentViewItem data={i} />
            </li>
          ))}
        </>
      </ul>
    </div>
  );
};
export default Blog2ResultContentViewBox;
