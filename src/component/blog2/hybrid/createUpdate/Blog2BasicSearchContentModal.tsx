import ThemeButton1 from "@component/common/button/ThemeButton1";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import LottieNotFound from "@component/common/lottie/LottieNotFound";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import useToastifyStore from "@store/toastifyStore";
import "@styles/customEditor.css";
import {
  EditorLiStyle,
  EditorTitleStyle,
  EditorUlStyle
} from "@utils/editor/EditorTailwindcssStyle";
import MarkdownPreview from "@utils/editor/MarkdownPreview";
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
  const toastifyStore = useToastifyStore();

  // 블로그 기초 글 검색 api
  const blog2BasicSearchHandler = async () => {
    // 검색결과가 동일하다면 요청을 보내지 않는다.
    if (searchRef.current!.value == search) {
      return;
    }
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
      toastifyStore.setToastify({
        message: `${result.data.blog2BasicList.content.length}개의 검색 결과`,
      });
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
    <ModalTemplate
      className={
        "h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] max-w-[60rem] pb-[1rem]"
      }
    >
      {props.closeButtonComponent}
      <div className="relative flex min-h-[4rem] w-full items-center py-2">
        {/* TODO : onKeyPressAction 쓸 수 있게 컴포넌트 수정 */}
        <ThemeInput1
          type={"text"}
          className={"h-[4rem] w-full outline-none"}
          placeholder={"블로그 기초 검색어를 입력해주세요"}
          maxLength={50}
          // onKeyPressAction={(e) => blog2BasicSearchHandler()}
          ref={searchRef}
        />
        <ThemeButton1
          className={"absolute right-1 top-1/2 -translate-y-1/2 px-4 py-2"}
          onClick={() => blog2BasicSearchHandler()}
        >
          검색
        </ThemeButton1>
      </div>
      <div className={"flex w-full gap-x-4 pb-4"}>
        검색어({blog2BasicContentList.length}) : {search}
      </div>
      <div className="primary-border-radius w-full p-2">
        <ul className={`${EditorUlStyle} mt-0 gap-y-4 pt-0`}>
          <>
            {blog2BasicContentList?.map((i) => (
              <li
                key={i.id}
                className={`${EditorLiStyle} max-h-[16rem] overflow-y-scroll`}
                // className={"relative outline outline-gray-80 outline-offset-[-.25rem] outline-[.5rem] rounded-[1rem] bg-white-80 p-[1rem] max-h-[16rem] overflow-y-scroll"}
              >
                <div className="sticky top-0 z-10">
                  <div className={"absolute right-2 top-2 flex gap-x-2"}>
                    {/* TODO : confirm으로 바꾸기 */}
                    <ThemeButton1
                      className={"p-2 opacity-40 hover:opacity-100"}
                      onClick={() => deleteBlog2BasicContentHandler(i.id)}
                    >
                      삭제
                    </ThemeButton1>
                    {/* TODO : 선택하고 나서 모달을 닫을지 고민 그리고 닫힌후 바로 렌더링 되는지 확인 */}
                    <ThemeButton1
                      className={"p-2 opacity-40 hover:opacity-100"}
                      onClick={() => props.addBlog2BasicContent(i)}
                    >
                      선택
                    </ThemeButton1>
                    {/* <Button className={"p-2 primary-border-radius opacity-40 hover:opacity-100 hover:bg-primary-20"} onClick={()=>deleteBlog2BasicContentHandler(i.id)}> 삭제 </Button> */}
                  </div>
                </div>
                <h2
                  className={EditorTitleStyle}
                  id={i.title.replace(/\s+/g, "-").toLowerCase()}
                >
                  {i.title}
                </h2>
                <MarkdownPreview content={i.content} />
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
