import Button from "@component/common/button/hybrid/Button";
import Input from "@component/common/input/Input";
import LottieNotFound from "@component/common/lottie/LottieNotFound";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import LoadingSpinner from "@component/common/spinner/LoadingSpinner";
import useLoading from "@hooks/useLoading";
import useToastifyStore from "@store/toastifyStore";
import "@styles/customEditor.css";
import {
    EditorLiStyle,
    EditorTitleStyle,
    EditorUlStyle
} from "@utils/editor/EditorTailwindcssStyle";
import MarkdownPreview from "@utils/editor/MarkdownPreview";
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
  const { loading, startLoading, stopLoading } = useLoading();
  const toastifyStore = useToastifyStore();

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
      toastifyStore.setToastify({
        message: `${result.data.blog2StructureContentList.content.length}개의 검색 결과`,
      });
      stopLoading();
    } else if (!response.ok) {
      setBlog2StructureContentList([]);
      stopLoading();
    }
  };

  return (
    <ModalTemplate
      className={"h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] max-w-[60rem]"}
    >
      <LoadingSpinner loading={loading} />
      {props.closeButtonComponent}
      <div className="relative flex min-h-[4rem] w-full items-center py-2">
        <Input
          type={"text"}
          className={"h-[4rem] w-full outline-none"}
          placeholder={"블로그 파일 디렉토리를 입력해주세요, /로 시작x"}
          maxLength={50}
          onKeyPressAction={(e) => blog2StructureSearchHandler()}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          className={
            "absolute right-1 top-1/2 -translate-y-1/2 rounded-[.5rem] bg-primary-20 px-4 py-2 primary-border"
          }
          onClick={() => blog2StructureSearchHandler()}
        >
          검색
        </Button>
      </div>
      <div className={"flex w-full gap-x-4 pb-4"}>
        검색어({blog2StructureContentList.length}) : {search}
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
                    <Button
                      className={
                        "p-2 opacity-40 primary-border-radius hover:bg-primary-20 hover:opacity-100"
                      }
                      onClick={() => props.addBlog2StructureContent(i)}
                    >
                      선택
                    </Button>
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
