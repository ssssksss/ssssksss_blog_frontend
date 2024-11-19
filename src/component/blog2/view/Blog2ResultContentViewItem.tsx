import {
  EditorPreviewStyle,
  EditorTitleStyle,
} from "@utils/editor/EditorTailwindcssStyle";
import { convertMarkdownToHtml } from "@utils/editor/ReturnMarkdown";
import Image from "next/image";
import { useState } from "react";

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
        id={props.data.title
          .replace(/\s+/g, "-")
          .toLowerCase()}
      >
        {props.data.title}
      </h2>
      {isCollapsed || (
        <div
          id="preview"
          className={EditorPreviewStyle}
          dangerouslySetInnerHTML={{
            __html: convertMarkdownToHtml(props.data.content),
          }}
        />
      )}
    </>
  );
};
export default Blog2ResultContentViewItem;