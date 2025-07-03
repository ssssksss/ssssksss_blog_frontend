import { EditorTitleStyle } from "@utils/editor/EditorTailwindcssStyle";
import MarkdownPreview from "@utils/editor/MarkdownPreview";
import { useState } from "react";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";
interface IBlog2BasicContentViewItem {
  data: IBlog2Basic;
}
const Blog2BasicContentViewItem = (props: IBlog2BasicContentViewItem) => {
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
        id={props.data.blog2BasicContent.title
          .replace(/\s+/g, "-")
          .toLowerCase()}
      >
        {props.data.blog2BasicContent.title}
      </h2>
      {isCollapsed || (
        <MarkdownPreview content={props.data.blog2BasicContent.content} parentId={props.data.id} />
      )}
    </>
  );
};
export default Blog2BasicContentViewItem;