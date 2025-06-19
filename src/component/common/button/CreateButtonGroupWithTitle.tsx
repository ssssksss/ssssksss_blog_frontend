
/**
 * 
 * @description 상단에 이름과 좌측(뒤로가기), 우측에(수정, 삭제, 제출 등의 버튼 배치)
 */

import { useRouter } from "next/navigation";
import BackButton from "./BackButton";
import SubmitButton from "./SubmitButton";


interface ICreateButtonGroupWithTitle {
  title: string;
  submitHandler: () => void;
}


const CreateButtonGroupWithTitle = (props: ICreateButtonGroupWithTitle) => {

  const router = useRouter();

  return (
    <div
      className={
        "grid w-full grid-cols-[2.75rem_calc(100%-5.5em)_2.75rem] items-center"
      }
    >
      <BackButton
        onClick={() => router.back()}
        className="aspect-square h-[2.75rem] p-2 default-flex"
      />
      <div
        className={
          "w-full break-words break-all rounded-[1rem] p-2 text-center font-SDSamliphopangche_Outline text-[1.5rem] font-bold"
        }
      >
        {props.title}
      </div>
      <SubmitButton
        className="aspect-square h-[2.75rem] bg-primary-20 p-2 font-bold primary-border-radius default-flex"
        isActive={true}
        onClick={props.submitHandler}
      />
    </div>
  );
};
export default CreateButtonGroupWithTitle;