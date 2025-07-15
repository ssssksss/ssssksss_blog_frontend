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
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaHandPointUp } from "react-icons/fa";

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
  const toastifyStore = useToastifyStore();
  const fetchCSR = useFetchCSR();
  const blog2FormContext = useFormContext();
  const searchRef = useRef<HTMLInputElement>(null);

  // 블로그 구조 글 검색 api
  const blog2StructureSearchHandler = async () => {
    if (searchRef.current!.value == search) {
      return;
    }
    const result: IResultSearchBlog2StructureContentList =
      await fetchCSR.requestWithHandler({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog2/structure/list?search=${encodeURIComponent(searchRef.current!.value)}&page=${page}`,
      });
    if (result == undefined) {
      setBlog2StructureContentList([]);
      return;
    }
    setBlog2StructureContentList(
      result.content,
    );
    setSearch(searchRef.current!.value);
    toastifyStore.setToastify({
      message: `${result.content.length}개의 검색 결과`,
    });
  };

  const deleteBlog2StructureContentHandler = async (id: number) => {
    const result = await fetchCSR.requestWithHandler({
      url: `/api/blog2/structure?id=${id}`,
      method: "DELETE",
      showSuccessToast: true,
      successMessage: "구조글이 삭제 되었습니다."
    });

    if (result == undefined) return;

    const _structureList = (blog2FormContext.getValues("blog2StructureList") as IBlog2Structure[]).filter((i) => i.blog2StructureContent.id != id);
    blog2FormContext.setValue("blog2StructureList", _structureList);
    props.closeModal!();
  };

  return (
    <ModalTemplate
      className={"h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] max-w-[60rem]"}
    >
      {props.closeButtonComponent}
      <SearchInputGroup
        wrapperClassName="h-[4rem]"
        onSearch={blog2StructureSearchHandler}
        ref={searchRef}
        placeholder="블로그 파일 디렉토리를 입력해주세요, /로 시작x"
      />
      <div className={"flex w-full gap-x-4 pb-4"}>
        🔎({blog2StructureContentList.length}개), 검색내용: {search}
      </div>
      <div className="w-full p-2 primary-border-radius">
        <ul className={`${EditorUlStyle} mt-0 gap-y-4 pt-0`}>
          <>
            {blog2StructureContentList?.map((i) => (
              <li
                key={i.id}
                className={`${EditorLiStyle} max-h-[16rem] overflow-y-scroll`}
              >
                <div className="sticky top-0 z-10">
                  <div className={"absolute right-2 top-2 flex gap-x-2"}>
                    <ThemeButton1
                      className={
                        "aspect-square p-2 opacity-40 hover:opacity-100"
                      }
                      onClick={() => props.addBlog2StructureContent(i)}
                    >
                      <FaHandPointUp size={"28"} />
                    </ThemeButton1>
                    <DeleteConfirmButton
                      className={"p-2 opacity-40 primary-set hover:opacity-100"}
                      ariaLabel="구조 글 삭제 버튼"
                      onCancelClick={() => {}}
                      onConfirmClick={() => {
                        deleteBlog2StructureContentHandler(i.id);
                      }}
                      mainMessage={["구조 글을 삭제하시겠습니까?"]}
                      subMessage={["다른 블로그 글에서도 전부 제거됩니다."]}
                      loading={false}
                    />
                  </div>
                </div>
                <h2
                  className={EditorTitleStyle}
                  id={i.directory.replace(/\s+/g, "-").toLowerCase()}
                >
                  {i.directory}
                </h2>
                <MarkdownPreview content={i.content} />
              </li>
            ))}
          </>
          {blog2StructureContentList.length == 0 && (
            <div className={"w-full default-flex"}>
              <LottieNotFound text={"아무런 내용이 없습니다."} />
            </div>
          )}
        </ul>
      </div>
    </ModalTemplate>
  );
};
export default Blog2StructureSearchContentModal;
