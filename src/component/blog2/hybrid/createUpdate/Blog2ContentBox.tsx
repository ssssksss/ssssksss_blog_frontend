import Button from "@component/common/button/hybrid/Button";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Blog2BasicContentBox from "./Blog2BasicContentBox";
import Blog2ResultBox from "./Blog2ResultBox";
import Blog2StructureContentBox from "./Blog2StructureContentBox";

interface IBlog2ContentBox {
  isEdit?: boolean;
}
const Blog2ContentBox = (props: IBlog2ContentBox) => {
  const [menu, setMenu] = useState("기초");
  const formContext = useFormContext();

  return (
    <section className={"mt-[.25rem] flex h-full w-full flex-col gap-y-2"}>
      <div
        className={
          "mt-[.25rem] flex h-[2.75rem] min-h-[2.75rem] w-full default-outline"
        }
      >
        <Button
          onClick={() => setMenu("기초")}
          className={`flex h-auto w-full gap-x-2 rounded-2xl default-flex ${menu == "기초" && "animate-rotateFadeIn bg-primary-60"}`}
        >
          <p
            className={`${menu == "기초" ? "text-white-80" : "text-black-80"}`}
          >
            기초
          </p>
          <p
            className={`${menu == "기초" ? "text-white-80" : "text-black-40"}`}
          >
            {formContext.getValues("blog2BasicList")?.length || 0}
          </p>
        </Button>
        <Button
          onClick={() => setMenu("구조")}
          className={`flex h-auto w-full gap-x-2 rounded-2xl default-flex ${menu == "구조" && "animate-rotateFadeIn bg-primary-60"}`}
        >
          <p
            className={`${menu == "구조" ? "text-white-80" : "text-black-80"}`}
          >
            구조
          </p>
          <p
            className={`${menu == "구조" ? "text-white-80" : "text-black-40"}`}
          >
            {formContext.getValues("blog2StructureList")?.length || 0}
          </p>
        </Button>
        {props.isEdit && (
          <Button
            onClick={() => setMenu("결과")}
            className={`flex h-auto w-full gap-x-2 rounded-2xl default-flex ${menu == "결과" && "animate-rotateFadeIn bg-primary-60"}`}
          >
            <p
              className={`${menu == "결과" ? "text-white-80" : "text-black-80"}`}
            >
              결과
            </p>
            <p
              className={`${menu == "결과" ? "text-white-80" : "text-black-40"}`}
            >
              {formContext.getValues("blog2ResultList")?.length || 0}
            </p>
          </Button>
        )}
      </div>
      <div className={"mt-[.25rem] flex h-full w-full p-2 default-outline"}>
        {menu == "기초" && <Blog2BasicContentBox isEdit={props.isEdit} />}
        {menu == "구조" && <Blog2StructureContentBox isEdit={props.isEdit} />}
        {menu == "결과" && <Blog2ResultBox />}
      </div>
    </section>
  );
};
export default Blog2ContentBox;
