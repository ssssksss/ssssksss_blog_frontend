import Button from "@component/common/button/hybrid/Button";
import Input from "@component/common/input/Input";
import LottieNotFound from "@component/common/lottie/LottieNotFound";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import "@styles/customEditor.css";
import {
    EditorLiStyle,
    EditorPreviewStyle,
    EditorTitleStyle,
    EditorUlStyle,
} from "@utils/editor/EditorTailwindcssStyle";
import { convertMarkdownToHtml } from "@utils/editor/ReturnMarkdown";
import { useRef, useState } from "react";

interface IBlog2BasicSearchContentModal extends IModalComponent {
  addBlog2BasicContent: (data: IBlog2BasicContent) => void;
}

const Blog2BasicSearchContentModal = (props: IBlog2BasicSearchContentModal) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [blog2BasicContentList, setBlog2BasicContentList] = useState<
    IBlog2BasicContent[]
  >([]);
  const searchRef = useRef<HTMLInputElement>(null);

  // 블로그 기초 글 검색 api
  const blog2BasicSearchHandler = async () => {
    const response = await fetch(
      `/api/blog2/basic/list?search=${searchRef.current!.value}&page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (response.ok) {
      const result: responseSearchBlog2BasicContentList = await response.json();
      setBlog2BasicContentList(result.data.blog2BasicList.content);
      setSearch(searchRef.current!.value);
    } else if (!response.ok) {
      setBlog2BasicContentList([]);
    }
  };

  const deleteBlog2BasicContentHandler = async (id: number) => {
    const response = await fetch(`/api/blog2/basic?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setBlog2BasicContentList(blog2BasicContentList.filter((i) => i.id != id));
      props.closeModal!();
    } else {
      alert("삭제 실패");
    }
  };

  return (
    <ModalTemplate className={"h-full w-[calc(100vw-1rem)] max-w-[60rem]"}>
      {props.closeButtonComponent}
      <div className="relative flex min-h-[4rem] w-full items-center py-2">
        <Input
          type={"text"}
          className={"h-[4rem] w-full outline-none"}
          placeholder={"블로그 기초 검색어를 입력해주세요"}
          maxLength={50}
          onKeyPressAction={(e) => blog2BasicSearchHandler()}
          ref={searchRef}
        />
        <Button
          className={
            "absolute right-1 top-1/2 -translate-y-1/2 rounded-[.5rem] bg-primary-20 px-4 py-2"
          }
          onClick={() => blog2BasicSearchHandler()}
        >
          검색
        </Button>
      </div>
      <div className={"w-full"}> 검색어 : {search} </div>
      <div className="mt-[2rem] h-full w-full p-2 default-outline">
        <ul className={`${EditorUlStyle} mt-0 gap-y-4`}>
          <>
            {blog2BasicContentList?.map((i) => (
              <li
                key={i.id}
                className={`${EditorLiStyle} max-h-[16rem] overflow-y-scroll`}
                // className={"relative outline outline-gray-80 outline-offset-[-.25rem] outline-[.5rem] rounded-[1rem] bg-white-80 p-[1rem] max-h-[16rem] overflow-y-scroll"}
              >
                <h2
                  className={EditorTitleStyle}
                  id={i.title.replace(/\s+/g, "-").toLowerCase()}
                >
                  {i.title}
                </h2>
                <div
                  id={"preview"}
                  className={EditorPreviewStyle}
                  dangerouslySetInnerHTML={{
                    __html: convertMarkdownToHtml(i.content),
                  }}
                />
                <div className={"absolute right-2 top-2 flex gap-x-2"}>
                  <Button
                    className={
                      "p-2 opacity-40 default-outline hover:bg-primary-20 hover:opacity-100"
                    }
                    onClick={() => deleteBlog2BasicContentHandler(i.id)}
                  >
                    삭제
                  </Button>
                  <Button
                    className={
                      "p-2 opacity-40 default-outline hover:bg-primary-20 hover:opacity-100"
                    }
                    onClick={() => props.addBlog2BasicContent(i)}
                  >
                    선택
                  </Button>
                  {/* <Button className={"p-2 default-outline opacity-40 hover:opacity-100 hover:bg-primary-20"} onClick={()=>deleteBlog2BasicContentHandler(i.id)}> 삭제 </Button> */}
                </div>
              </li>
            ))}
            {blog2BasicContentList.length == 0 && (
              <div className={"w-full default-flex"}>
                <LottieNotFound text={"아무런 내용이 없습니다."} />
              </div>
            )}
          </>
        </ul>
      </div>
    </ModalTemplate>
  );
};
export default Blog2BasicSearchContentModal;
