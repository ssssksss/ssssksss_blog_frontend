import ThemeButton1 from "@component/common/button/ThemeButton1";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import ModalButton from "@component/common/modal/hybrid/ModalButton";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import useFetchCSR from "@hooks/useFetchCSR";
import { useRef } from "react";
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";
import SiteBookmarkCategoryDeleteListModal from "./SiteBookmarkCategoryDeleteListModal";
interface ISiteBookmarkCategoryModal extends IModalComponent {

}
const SiteBookmarkCategoryModal = (props: ISiteBookmarkCategoryModal) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const fetchCSR = useFetchCSR();
  const createSiteBookmarkCategory = () => {
    // name, isAuth
    if (inputRef.current?.value == "") return;
    fetchCSR.requestWithHandler({
      url: "/api/site-bookmark/category",
      method: "POST",
      body: { name: inputRef.current?.value },
      showSuccessToast: true,
      successMessage: "카테고리 생성에 성공했습니다."
    });
  };
  
  const updateSiteBookmarkCategory = () => {
    // name, isAuth
  };

  const deleteSiteBookmarkCategory = () => {
    // id, isAuth
  };

  return (
    <ModalTemplate style={{paddingBottom: "32px"}}>
      {props.closeButtonComponent}
      <section className="bg-white mb-6 w-full flex-col rounded-xl border-2 border-primary-80 p-4 pb-8 shadow-lg">
        <div className="mb-4 flex items-center">
          <IoIosAddCircleOutline size={28} className="mr-2 text-primary-60" />
          <h2 className="text-xl font-bold text-primary-80">
            링크 북마크 카테고리 생성
          </h2>
        </div>
        <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3">
          <label className="font-semibold text-primary-80">이름</label>
          <ThemeInput1
            ref={inputRef}
            placeholder="카테고리 이름을 입력"
            className="w-full rounded-lg border border-primary-40 px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-primary-60"
          />
          <ThemeButton1 className="ml-2 p-0 transition-transform" onClick={createSiteBookmarkCategory}>
            <IoIosAddCircleOutline size={36} className="text-primary-60" />
          </ThemeButton1>
        </div>
      </section>

      <section className="bg-white w-full rounded-xl border-2 border-primary-80 p-4 shadow-lg flex flex-col gap-2">
        <div className="mb-2 flex items-center">
          <IoIosRemoveCircleOutline size={28} className="mr-2 text-red-400" />
          <h2 className="text-xl font-bold text-primary-80">
            링크 북마크 카테고리 삭제
          </h2>
        </div>
        <div className="relative w-full">
          <ModalButton
            buttonClassName={
              "aspect-square h-[2rem] primary-set font-bold primary-border-radius default-flex w-full"
            }
            modal={<SiteBookmarkCategoryDeleteListModal />}
          >
            <ThemeButton1 className="w-full py-2"> 삭제할 카테고리 선택하기 </ThemeButton1>
          </ModalButton>
        </div>
      </section>
    </ModalTemplate>
  );
};
export default SiteBookmarkCategoryModal;