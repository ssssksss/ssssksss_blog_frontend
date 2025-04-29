import ThemeButton1 from "@component/common/button/ThemeButton1";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import ModalButton from "@component/common/modal/hybrid/ModalButton";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import useFetchCSR from "@hooks/useFetchCSR";
import useSiteBookmarkStore from "@store/siteBookmarkStore";
import { useRef } from "react";
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";
import SiteBookmarkCategoryDeleteListModal from "./SiteBookmarkCategoryDeleteListModal";
interface ISiteBookmarkCategoryModal extends IModalComponent {

}
const SiteBookmarkCategoryModal = (props: ISiteBookmarkCategoryModal) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const fetchCSR = useFetchCSR();
  const siteBookmarkStore = useSiteBookmarkStore();
  const createSiteBookmarkCategory = async () => {
    // name, isAuth
    if (inputRef.current?.value == "") return;
    const result: ISiteBookmarkCategory = await fetchCSR.requestWithHandler({
      url: "/api/site-bookmark/category",
      method: "POST",
      body: { name: inputRef.current?.value },
      showSuccessToast: true,
      successMessage: "카테고리 생성에 성공했습니다."
    });
    siteBookmarkStore.setSiteBookmarkCategory({
      id: result.id,
      name: result.name,
      siteBookmark: [],
    });
    props.closeModal!();
  };
  
  const updateSiteBookmarkCategory = () => {
    // name, isAuth
  };

  const deleteSiteBookmarkCategory = async (siteBookmarkCategoryId: number) => {
    if (siteBookmarkCategoryId <= 0) return;
    const result = await fetchCSR.requestWithHandler({
      url: `/api/site-bookmark/category?id=${siteBookmarkCategoryId}`,
      method: "DELETE",
      showSuccessToast: true,
      successMessage: "카테고리 삭제 했습니다.",
    });
    if (result == "success") {
      const _temp = siteBookmarkStore.siteBookmarkCategoryList.filter(i=>i.id != siteBookmarkCategoryId);
      siteBookmarkStore.setInit(_temp);
    }
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
          <ThemeButton1
            className="ml-2 p-0 transition-transform"
            onClick={createSiteBookmarkCategory}
          >
            <IoIosAddCircleOutline size={36} className="text-primary-60" />
          </ThemeButton1>
        </div>
      </section>

      <section className="bg-white flex w-full flex-col gap-2 rounded-xl border-2 border-primary-80 p-4 shadow-lg">
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
            modal={
              <SiteBookmarkCategoryDeleteListModal
                deleteSiteBookmarkCategory={deleteSiteBookmarkCategory}
              />
            }
          >
            <ThemeButton1 className="w-full py-2">
              삭제할 카테고리 선택하기
            </ThemeButton1>
          </ModalButton>
        </div>
      </section>
    </ModalTemplate>
  );
};
export default SiteBookmarkCategoryModal;