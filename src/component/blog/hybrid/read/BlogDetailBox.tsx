"use client";

import Button from "@component/common/button/hybrid/Button";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditorLiStyle, EditorPriviewStyle, EditorUlStyle } from "@utils/editor/EditorTailwindcssStyle";
import { convertMarkdownToHtml } from "@utils/editor/ReturnMarkdown";
import { useRouter } from "next/navigation";
import useUserStore from "src/store/userStore";

interface IBlogDetailBox {
    data: IBlog
}
const BlogDetailBox = (props: IBlogDetailBox) => {
  const router = useRouter();
  const userStore = useUserStore();
  
  return (
    <section className={"w-full h-full flex flex-col gap-y-2 mt-[.25rem]"}>
      <div className="grid grid-cols-[3.5rem_calc(100%-7rem)_3.5rem] w-full pb-2 items-center">  
        <Button className={"p-2 default-outline bg-primary-20 min-h-[3rem] aspect-square default-flex"} onClick={()=>router.back()}> <FontAwesomeIcon icon={faArrowLeft} /> </Button>
        <div className={"text-[1.5rem] w-full font-bold font-SDSamliphopangche_Outline text-center p-2 rounded-[1rem] break-all break-words"}>
          {props.data.title}
        </div>
        {
          userStore.role == "ROLE_ADMIN" &&
          <Button className={"p-2 font-bold default-outline bg-primary-20  min-h-[3rem] aspect-square default-flex"} onClick={() => router.push(`/blog/update/${props.data.id}`)}> 수정 </Button>
        } 
      </div>
      <div className={EditorUlStyle}>
        <div
          className={EditorLiStyle}
        >
          <div
            id={"preview"}
            className={EditorPriviewStyle}
            dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(props.data.content) }}
          />
        </div>
      </div>
    </section> 
  );
};
export default BlogDetailBox;