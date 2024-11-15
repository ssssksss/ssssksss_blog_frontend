import AbsoluteCloseButton from "@component/common/button/hybrid/AbsoluteCloseButton";
import LottieNotFound from "@component/common/lottie/LottieNotFound";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useModalState from "@hooks/useModalState";
import useOutsideClick from "@hooks/useOutsideClick";
import "@styles/customEditor.css";
import {
  EditorLiStyle,
  EditorPriviewStyle,
  EditorTitleStyle,
  EditorUlStyle,
} from "@utils/editor/EditorTailwindcssStyle";
import {convertMarkdownToHtml} from "@utils/editor/ReturnMarkdown";
import {useRef} from "react";
import Blog2StructureIndexTree from "./Blog2StructureIndexTree";

interface IBlog2StructureContentViewBox {
  data: IBlog2Structure[];
}

interface IBlog2StructureIndexTree {
  paths: string[];
}
interface TreeNode {
  children: Record<string, TreeNode>;
}

interface DirectoryTreeProps {
  paths: string[];
}

const Blog2StructureContentViewBox = (props: IBlog2StructureContentViewBox) => {
  const modalState = useModalState();
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    modalState.closeModal();
  });

  const paths: string[] = props.data.map(
    (i) => i.blog2StructureContent.directory,
  );

  const buildTree = (paths: string[]) => {
    const tree: Record<string, TreeNode> = {};

    paths.forEach((path) => {
      const parts = path.split("/");
      let current = tree;

      parts.forEach((part, index) => {
        if (!current[part]) {
          current[part] = {
            children: {},
          };
        }
        current = current[part].children;
      });
    });

    return tree;
  };

  const DirectoryTree: React.FC<DirectoryTreeProps> = ({paths}) => {
    const treeData = buildTree(paths);

    return (
      <div className="overflow-x-scroll scrollbar-hide">
        {Object.keys(treeData).map((name) => (
          <Blog2StructureIndexTree
            key={name}
            name={name}
            node={treeData[name]}
          />
        ))}
      </div>
    );
  };

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
        <div
          ref={ref}
          className="sticky left-[calc(100%-1rem)] top-[4.5rem] z-10 h-0 w-0 translate-x-1">
          <ul className="absolute right-0 flex max-h-[calc(100vh-5rem)] w-[20rem] max-w-[50vw] flex-col gap-y-2 bg-white-80 p-4 pt-12 default-outline min-[1900px]:left-[0.375rem]">
            <AbsoluteCloseButton
              className={"right-[1rem] top-[1rem]"}
              onClick={() => modalState.closeModal()}
            />
            <DirectoryTree paths={paths} />
          </ul>
        </div>
      )}
      {!modalState.isOpen && (
        <div className="sticky left-[100%] top-[4.5rem] z-10 h-0 w-0">
          <button
            onClick={() => modalState.openModal()}
            className={
              "absolute right-0 top-0 z-20 h-[2.5rem] w-[2.5rem] bg-primary-20 default-outline"
            }>
            <FontAwesomeIcon icon={faBars} className="text-[2rem]" />
          </button>
        </div>
      )}

      <ul className={EditorUlStyle}>
        <>
          {props.data.map((i: IBlog2Structure) => (
            <li key={i.id} className={EditorLiStyle}>
              <h2
                className={EditorTitleStyle}
                // id={i.blog2StructureContent.directory.replace(/\s+/g, "-").toLowerCase()}>
                id={i.blog2StructureContent.directory.split("/").pop()}>
                {i.blog2StructureContent.directory.split("/").pop()}
              </h2>
              <div
                id={"preview"}
                className={EditorPriviewStyle}
                dangerouslySetInnerHTML={{
                  __html: convertMarkdownToHtml(
                    i.blog2StructureContent.content,
                  ),
                }}
              />
            </li>
          ))}
        </>
      </ul>
    </div>
  );
};
export default Blog2StructureContentViewBox;