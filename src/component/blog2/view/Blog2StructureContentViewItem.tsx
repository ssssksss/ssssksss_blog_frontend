import { EditorTitleStyle } from "@utils/editor/EditorTailwindcssStyle";
import MarkdownPreview from "@utils/editor/MarkdownPreview";
import Image from "next/image";
import { useState } from "react";

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
        {isCollapsed ? (
          <Image
            alt="ic"
            src={"/images/icons/ic-maximize.svg"}
            width={28}
            height={28}
          />
        ) : (
          <Image
            alt="ic"
            src={"/images/icons/ic-minimize.svg"}
            width={28}
            height={28}
          />
        )}
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