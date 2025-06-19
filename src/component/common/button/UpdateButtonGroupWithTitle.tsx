
/**
 * 
 * @description 상단에 이름과 좌측(뒤로가기), 우측에(수정, 삭제, 제출 등의 버튼 배치)
 */

import useLoading from "@hooks/useLoading";
import useModalState from "@hooks/useModalState";
import { useRouter } from "next/navigation";
import BackButton from "./BackButton";
import DeleteConfirmButton from "./DeleteConfirmButton";
import EditButton from "./EditButton";


interface IUpdateButtonGroupWithTitle {
  isAdmin?: boolean;
  title: string;
  deleteHandler: () => void;
  deleteInfoMessage?: string[];
  routeEditURL: string;
}


const UpdateButtonGroupWithTitle = (props: IUpdateButtonGroupWithTitle) => {

  const loadingFunc = useLoading();
  const modalState = useModalState();
  const router = useRouter();

  return (
    <div
      className={`grid w-full ${props.isAdmin ? "grid-cols-[2.75rem_calc(100%-8.5em)_5.75rem]" : "grid-cols-[2.75rem_calc(100%-5.5em)_2.75rem]"} items-center`}
    >
      <BackButton className="aspect-square h-[2.75rem] min-h-[2.75rem] p-2 default-flex" />
      <div
        className={`w-full break-words break-all rounded-[1rem] text-center font-SDSamliphopangche_Outline text-[1.5rem] font-bold ${props.isAdmin ? "pl-[3rem]" : "p-2"}`}
      >
        {props.title}
      </div>
      {props.isAdmin && (
        <div className={"flex gap-x-2"}>
          {loadingFunc.loading ? (
            <div className="aspect-square h-[2.75rem] primary-border-radius default-flex">
              <div className="h-4 w-4 animate-spin rounded-full border-b-4 border-blue-500"></div>
            </div>
          ) : (
            <EditButton
              onClick={() => {
                loadingFunc.startLoading();
                router.push(`${props.routeEditURL}`);
              }}
              className="h-[2.75rem]"
              size={"24"}
              aria-label="수정하기 버튼"
            />
          )}
          <DeleteConfirmButton
            className="h-[2.75rem]"
            ariaLabel="삭제 버튼"
            size={"24"}
            onCancelClick={() => {
              modalState.closeModal();
            }}
            onConfirmClick={() => {
              loadingFunc.startLoading();
              props.deleteHandler && props.deleteHandler();
            }}
            mainMessage={props.deleteInfoMessage || ["삭제하시겠습니까?"]}
            loading={loadingFunc.loading}
          />
        </div>
      )}
    </div>
  );
};
export default UpdateButtonGroupWithTitle;