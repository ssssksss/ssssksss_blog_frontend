import Button from "@component/common/button/hybrid/Button";
import {useState} from "react";
import {useFormContext} from "react-hook-form";
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
      <div className={"mt-[1rem] flex min-h-[3.75rem] w-full default-outline"}>
        <Button
          onClick={() => setMenu("기초")}
          className={`h-auto w-full ${menu == "기초" && "rounded-l-[1rem] bg-primary-20"}`}>
          기초
          <span className="pl-1 text-black-40">
            {formContext.getValues("blog2BasicList")?.length || 0}
          </span>
        </Button>
        <Button
          onClick={() => setMenu("구조")}
          className={`h-auto w-full ${menu == "구조" && "bg-primary-20"}`}>
          구조
          <span className="pl-1 text-black-40">
            {formContext.getValues("blog2StructureList")?.length || 0}
          </span>
        </Button>
        {props.isEdit && (
          <Button
            onClick={() => setMenu("결과")}
            className={`h-auto w-full ${menu == "결과" && "rounded-r-[1rem] bg-primary-20"}`}>
            결과
            <span className="pl-1 text-black-40">
              {formContext.getValues("blog2ResultList")?.length || 0}
            </span>
          </Button>
        )}
      </div>
      <div className={"mt-[1rem] flex h-full w-full p-2 default-outline"}>
        {menu == "기초" && <Blog2BasicContentBox isEdit={props.isEdit} />}
        {menu == "구조" && <Blog2StructureContentBox isEdit={props.isEdit} />}
        {menu == "결과" && <Blog2ResultBox />}
      </div>
    </section>
  );
};
export default Blog2ContentBox;
