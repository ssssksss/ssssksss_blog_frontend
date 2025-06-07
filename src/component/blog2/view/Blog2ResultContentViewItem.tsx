import {
  EditorTitleStyle
} from "@utils/editor/EditorTailwindcssStyle";
import MarkdownPreview from "@utils/editor/MarkdownPreview";
import { useState } from "react";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";
interface IBlog2ResultContentViewItem {
  data: IBlog2Result;
}
const Blog2ResultContentViewItem = (props: IBlog2ResultContentViewItem) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <button
        className="absolute -right-2 top-2 h-8 w-12"
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        {isCollapsed ? <FiMaximize2 size="28" /> : <FiMinimize2 size="28" />}
      </button>
      <h2
        className={EditorTitleStyle}
        id={props.data.title
          .replace(/\s+/g, "-")
          .toLowerCase()}
      >
        {props.data.title}
      </h2>
      {isCollapsed || (
        <MarkdownPreview content={props.data.content} />
      )}
    </>
  );
};
export default Blog2ResultContentViewItem;