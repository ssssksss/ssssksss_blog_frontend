import ModalButton from "@component/common/modal/hybrid/ModalButton";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlassPlus";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons/faSquarePlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditorUlStyle } from "@utils/editor/EditorTailwindcssStyle";
import { useFormContext } from "react-hook-form";
import Blog2BasicContentItem from "./Blog2BasicContentItem";
import Blog2BasicCreateUpdateContentModal from "./Blog2BasicCreateUpdateContentModal";
import Blog2BasicSearchContentModal from "./Blog2BasicSearchContentModal";

interface IBlog2BasicContentBox {
  isEdit?: boolean;
}
const Blog2BasicContentBox = (props: IBlog2BasicContentBox) => {
  
  const blog2FormContext = useFormContext();

  const addBlog2BasicContent = (data: IBlog2BasicContent) => {
    
    // 생성
    blog2FormContext.setValue("blog2BasicList", [...blog2FormContext.getValues("blog2BasicList"), {
      id: 0,
      position: 0,
      blog2BasicContent: data
    }]);
    blog2FormContext.setValue("isUpdateBlog2Basic", true);
  };

  const removeBlog2BasicContent = (id: number) => {
    const temp = (blog2FormContext.getValues("blog2BasicList") as IBlog2Basic[]).filter((i) => i.blog2BasicContent.id != id);  
    blog2FormContext.setValue("blog2BasicList", [...temp]);
    if (props.isEdit) {
      blog2FormContext.setValue("isUpdateBlog2Basic", true);
      blog2FormContext.setValue("deleteBlog2BasicList", [...blog2FormContext.getValues("deleteBlog2BasicList"), id]);
    }
  };

  const updateBlog2BasicContent = (data: IBlog2BasicContent) => {
      
    // id값이 일치하는 부분만 덜어낸다.
    const updatedList = blog2FormContext
      .getValues("blog2BasicList")  // 기존 리스트 가져오기
      .map((item: IBlog2Basic) => 
        item.blog2BasicContent.id == data.id  // id가 일치하는 항목 찾기
          ? { ...item, blog2BasicContent: data }  // 일치하면 해당 항목 업데이트
          : item  // 일치하지 않으면 기존 항목 유지
      );
    // 수정된 리스트를 다시 설정
    blog2FormContext.setValue("blog2BasicList", updatedList);
  };

  return (
    <div className={"relative w-full flex flex-col rounded-[1rem] p-0"}> 
      <article className="sticky left-2 top-[4.5rem] z-10 -translate-y-2 -translate-x-2 w-fit p-1 flex default-outline gap-2 opacity-80 hover:opacity-100 bg-primary-60">
        <ModalButton
          buttonClassName={"default-outline px-4 font-bold h-[2.5rem] bg-white-80  hover:bg-primary-20"}
          modal={<Blog2BasicCreateUpdateContentModal addBlog2BasicContent={addBlog2BasicContent} updateBlog2BasicContent={updateBlog2BasicContent} />}
        >
          <FontAwesomeIcon icon={faSquarePlus} style={{ width: "24px", height: "24px" }} />
        </ModalButton>
        <ModalButton
          buttonClassName={"default-outline px-4 font-bold h-[2.5rem] bg-white-80  hover:bg-primary-20"}
          modal={<Blog2BasicSearchContentModal addBlog2BasicContent={addBlog2BasicContent} />}
        >
          <FontAwesomeIcon icon={faMagnifyingGlassPlus} style={{ width: "24px", height: "24px"}} />
        </ModalButton>
      </article>
      <ul className={EditorUlStyle}>
        <>
          {
            blog2FormContext.getValues("blog2BasicList")?.map((i: IBlog2Basic) => (
              <Blog2BasicContentItem key={i.blog2BasicContent.id} data={i} removeBlog2BasicContent={removeBlog2BasicContent} updateBlog2BasicContent={updateBlog2BasicContent} />
            ))
          }
        </>
      </ul>
    </div> 
  );
};
export default Blog2BasicContentBox; 