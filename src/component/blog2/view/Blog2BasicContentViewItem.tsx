import { EditorPriviewStyle, EditorTitleStyle } from "@utils/editor/EditorTailwindcssStyle";
import { convertMarkdownToHtml } from "@utils/editor/ReturnMarkdown";
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
        <div
          id="preview"
          className={EditorPriviewStyle}
          dangerouslySetInnerHTML={{
            __html: convertMarkdownToHtml(props.data.blog2BasicContent.content),
          }}
        />
      )}
    </>
  );
};
export default Blog2BasicContentViewItem;