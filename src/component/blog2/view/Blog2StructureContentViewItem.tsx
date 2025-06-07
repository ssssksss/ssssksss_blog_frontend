import { EditorTitleStyle } from "@utils/editor/EditorTailwindcssStyle";
import MarkdownPreview from "@utils/editor/MarkdownPreview";
import { useState } from "react";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";
interface IBlog2StructureContentViewItem {
  data: IBlog2Structure;
}
const Blog2StructureContentViewItem = (props: IBlog2StructureContentViewItem) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
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
        id={props.data.blog2StructureContent.directory.split("/").pop()}
      >
        {props.data.blog2StructureContent.directory.split("/").pop()}
      </h2>
      {isCollapsed || (
        <MarkdownPreview content={props.data.blog2StructureContent.content} />
      )}
    </>
  );
};
export default Blog2StructureContentViewItem;