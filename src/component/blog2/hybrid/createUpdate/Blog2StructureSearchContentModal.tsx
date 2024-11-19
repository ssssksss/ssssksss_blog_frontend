import Button from "@component/common/button/hybrid/Button";
import Input from "@component/common/input/Input";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import LoadingSpinner from "@component/common/spinner/LoadingSpinner";
import useLoading from "@hooks/useLoading";
import "@styles/customEditor.css";
import {
    EditorLiStyle,
    EditorPreviewStyle,
    EditorTitleStyle,
    EditorUlStyle,
} from "@utils/editor/EditorTailwindcssStyle";
import { convertMarkdownToHtml } from "@utils/editor/ReturnMarkdown";
import { useState } from "react";

interface IBlog2StructureSearchContentModal extends IModalComponent {
  addBlog2StructureContent: (data: IBlog2StructureContent) => void;
}

const Blog2StructureSearchContentModal = (
  props: IBlog2StructureSearchContentModal,
) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [blog2StructureContentList, setBlog2StructureContentList] = useState<
    IBlog2StructureContent[]
  >([]);
  const {loading, startLoading, stopLoading} = useLoading();

  // 블로그 기초 글 검색 api
  const blog2StructureSearchHandler = async () => {
    startLoading();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog2/structure/list?search=${search}&page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (response.ok) {
      const result: responseSearchBlog2StructureContentList =
        await response.json();
      setBlog2StructureContentList(
        result.data.blog2StructureContentList.content,
      );
      stopLoading();
    } else if (!response.ok) {
      setBlog2StructureContentList([]);
      stopLoading();
    }
  };

  return (
    <ModalTemplate className={"h-full w-[calc(100vw-1rem)] max-w-[60rem]"}>
      <LoadingSpinner loading={loading} />
      {props.closeButtonComponent}
      <div className="relative flex min-h-[4rem] w-full items-center py-2">
        <Input
          type={"text"}
          className={"h-[4rem] w-full outline-none"}
          placeholder={"블로그 파일 디렉토리를 입력해주세요"}
          maxLength={50}
          onKeyPressAction={(e) => blog2StructureSearchHandler()}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          className={
            "absolute right-1 top-1/2 -translate-y-1/2 rounded-[.5rem] bg-primary-20 px-4 py-2"
          }
          onClick={() => blog2StructureSearchHandler()}>
          검색
        </Button>
      </div>
      <div className="mt-[2rem] h-full w-full whitespace-nowrap p-2 default-outline">
        <ul className={EditorUlStyle}>
          <>
            {blog2StructureContentList?.map((i) => (
              <li key={i.id} className={EditorLiStyle}>
                <h2
                  className={EditorTitleStyle}
                  id={i.directory.replace(/\s+/g, "-").toLowerCase()}>
                  {i.directory}
                </h2>
                <div
                  id={"preview"}
                  className={
                    EditorPreviewStyle
                  }
                  dangerouslySetInnerHTML={{
                    __html: convertMarkdownToHtml(i.content),
                  }}
                />
                <div className={"absolute right-2 top-2 flex gap-x-2"}>
                  <Button
                    className={
                      "p-2 opacity-40 default-outline hover:bg-primary-20 hover:opacity-100"
                    }
                    onClick={() => props.addBlog2StructureContent(i)}>
                    선택
                  </Button>
                  {/* <Button className={"p-2 default-outline opacity-40 hover:opacity-100 hover:bg-primary-20"} onClick={()=>deleteBlog2StructureContentHandler(i.id)}> 삭제 </Button> */}
                </div>
              </li>
            ))}
          </>
        </ul>
      </div>
    </ModalTemplate>
  );
};
export default Blog2StructureSearchContentModal;
