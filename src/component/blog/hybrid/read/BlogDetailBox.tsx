"use client";

import Button from "@component/common/button/hybrid/Button";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditorLiStyle, EditorUlStyle } from "@utils/editor/EditorTailwindcssStyle";
import MarkdownPreview from "@utils/editor/MarkdownPreview";
import { useRouter } from "next/navigation";
import useUserStore from "src/store/userStore";

interface IBlogDetailBox {
    data: IBlog
}
const BlogDetailBox = (props: IBlogDetailBox) => {
  const router = useRouter();
  const userStore = useUserStore();
  
  return (
    <section className={"mt-[.25rem] flex h-full w-full flex-col gap-y-2"}>
      <div className="grid w-full grid-cols-[3.5rem_calc(100%-7rem)_3.5rem] items-center pb-2">
        <Button
          className={
            "aspect-square min-h-[3rem] bg-primary-20 p-2 primary-border-radius default-flex"
          }
          onClick={() => router.back()}
        >
          
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <div
          className={
            "w-full break-words break-all rounded-[1rem] p-2 text-center font-SDSamliphopangche_Outline text-[1.5rem] font-bold"
          }
        >
          {props.data.title}
        </div>
        {userStore.role == "ROLE_ADMIN" && (
          <Button
            className={
              "aspect-square min-h-[3rem] bg-primary-20 p-2 font-bold primary-border-radius default-flex"
            }
            onClick={() => router.push(`/blog/update/${props.data.id}`)}
          >
            수정
          </Button>
        )}
      </div>
      <div className={EditorUlStyle}>
        <div className={EditorLiStyle}>
          <MarkdownPreview content={props.data.content} />
        </div>
      </div>
    </section>
  );
};
export default BlogDetailBox;