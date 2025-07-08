import DeleteConfirmButton from "@component/common/button/DeleteConfirmButton";
import ThemeButton1 from "@component/common/button/ThemeButton1";
import SearchInputGroup from "@component/common/input/SearchInputGroup";
import LottieNotFound from "@component/common/lottie/LottieNotFound";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import useFetchCSR from "@hooks/useFetchCSR";
import useToastifyStore from "@store/toastifyStore";
import "@styles/customEditor.css";
import {
  EditorLiStyle,
  EditorTitleStyle,
  EditorUlStyle
} from "@utils/editor/EditorTailwindcssStyle";
import MarkdownPreview from "@utils/editor/MarkdownPreview";
import clog from "@utils/logger/logger";
import { useRef, useState } from "react";
import { FaHandPointUp } from "react-icons/fa";

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
  const fetchCSR = useFetchCSR();

  // 블로그 기초 글 검색 api
  const blog2BasicSearchHandler = async () => {
    // 검색결과가 동일하다면 요청을 보내지 않는다.
    if (searchRef.current!.value == search) {
      return;
    }
    clog.info("블로그 기초 글 검색 API 요청");
    const result = await fetchCSR.requestWithHandler({
      url: `/api/blog2/basic/list?search=${encodeURIComponent(searchRef.current!.value)}&page=${page}`
    });

    if (result == undefined) {
      setBlog2BasicContentList([]);
      return;
    };
    setBlog2BasicContentList(result.blog2BasicList.content);
    setSearch(searchRef.current!.value);
    toastifyStore.setToastify({
      message: `${result.blog2BasicList.content.length}개의 검색 결과`,
    });
  };

  const deleteBlog2BasicContentHandler = async (id: number) => {
    const result = await fetchCSR.requestWithHandler(
      {
        url: `/api/blog2/basic?id=${id}`,
        method: "DELETE"
      });
    
    if (result == undefined) {
      return;
    };

    setBlog2BasicContentList(blog2BasicContentList.filter((i) => i.id != id));
      props.closeModal!();
  };

  return (
    <ModalTemplate
      className={
        "h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] max-w-[60rem] pb-[1rem]"
      }
    >
      {props.closeButtonComponent}
      <SearchInputGroup
        wrapperClassName="h-[4rem]"
        onSearch={blog2BasicSearchHandler}
        ref={searchRef}
      />
      <div className={"flex w-full gap-x-4 pb-4"}>
        🔎({blog2BasicContentList.length}개), 검색내용: {search}
      </div>
      <div className="w-full p-2 primary-border-radius">
        <ul className={`${EditorUlStyle} mt-0 gap-y-4 pt-0`}>
          <>
            {blog2BasicContentList?.map((i) => (
              <li
                key={i.id}
                className={`${EditorLiStyle} max-h-[16rem] overflow-y-scroll py-4`}
              >
                <div className="sticky top-0 z-10">
                  <div className={"absolute right-0 top-[-12px] flex gap-x-1"}>
                    {/* TODO : confirm으로 바꾸기 */}
                    <ThemeButton1
                      className={
                        "aspect-square p-2 opacity-40 hover:opacity-100"
                      }
                      onClick={() => props.addBlog2BasicContent(i)}
                    >
                      <FaHandPointUp size={"28"} />
                    </ThemeButton1>
                    <DeleteConfirmButton
                      className={"p-2 opacity-40 primary-set hover:opacity-100"}
                      ariaLabel="기초 글 삭제 버튼"
                      onCancelClick={() => {}}
                      onConfirmClick={() => {
                        deleteBlog2BasicContentHandler(i.id);
                      }}
                      mainMessage={["게시판을 삭제하시겠습니까?"]}
                      loading={false}
                    />
                    {/* TODO : 선택하고 나서 모달을 닫을지 고민 그리고 닫힌후 바로 렌더링 되는지 확인 */}
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
