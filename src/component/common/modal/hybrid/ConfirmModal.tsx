import LoadingSpinner from "@component/common/spinner/LoadingSpinner";
import ModalTemplate from "./ModalTemplate";

/**
 * ModalButton의 modal에 넣어서 사용
 */

interface IConfirmModal extends IModalComponent {
  loading: boolean;
  onConfirmClick: () => void;
  onCancelClick: () => void;
  mainMessage?: string[];
  subMessage?: string[];
}

const ConfirmModal = ({
  loading = false,
  onConfirmClick,
  onCancelClick,
  mainMessage,
  subMessage,
  ...props
}: IConfirmModal) => {
  return (
    <ModalTemplate className="max-h-[340px] w-[calc(100vw-1rem)] max-w-[40rem]">
      {props.closeButtonComponent}
      <LoadingSpinner loading={loading} />
      <div className="bg-white flex h-fit w-full flex-col items-center gap-6 rounded-xl p-6">
        <h1 className="text-3xl">
          {mainMessage
            ? mainMessage?.map((i) => <p key={i}> {i} </p>)
            : "승낙하시겠습니까?"}
        </h1>
        <div className="text-gray1">
          {subMessage?.map((i) => <p key={i}> {i} </p>)}
        </div>
        <div className="flex flex-row gap-4">
          <button
            className="h-10 w-20 rounded-full bg-blue-60 text-white-80 shadow-md hover:scale-105"
            onClick={() => {
              onConfirmClick();
              props.closeModal!();
            }}
            aria-label="확인 버튼"
          >
            확인
          </button>
          <button
            className="h-10 w-20 rounded-full bg-red-60 text-white-80 shadow-md hover:scale-105"
            onClick={() => {
              onCancelClick();
              props.closeModal!();
            }}
            aria-label="취소 버튼"
          >
            취소
          </button>
        </div>
      </div>
    </ModalTemplate>
  );
};

export default ConfirmModal;
