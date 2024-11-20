import { EditorTitleStyle } from "@utils/editor/EditorTailwindcssStyle";
import MarkdownPreview from "@utils/editor/MarkdownPreview";
import Image from "next/image";
import { useState } from "react";

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
        id={props.data.blog2BasicContent.title
          .replace(/\s+/g, "-")
          .toLowerCase()}
      >
        {props.data.blog2BasicContent.title}
      </h2>
      {isCollapsed || (
        <MarkdownPreview content={props.data.blog2BasicContent.content} />
      )}
    </>
  );
};
export default Blog2BasicContentViewItem;