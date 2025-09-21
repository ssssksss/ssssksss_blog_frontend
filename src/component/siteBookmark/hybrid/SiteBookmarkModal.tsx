import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import ThemeButton1 from "@component/common/button/ThemeButton1";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import useFetchCSR from "@hooks/useFetchCSR";
import useSiteBookmarkStore from "@store/siteBookmarkStore";
import { useRef, useState } from "react";
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";
interface ISiteBookmarkModal extends IModalComponent {
  siteBookmarkCategoryId: number;
}
const SiteBookmarkModal = (props: ISiteBookmarkModal) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const siteBookmarkStore = useSiteBookmarkStore();
  const [deleteSiteBookmarkItem, setDeleteSiteBookmarkItem] = useState({
    id: 0,
    name: ""
  });
  const fetchCSR = useFetchCSR();
  const createSiteBookmark = async () => {
    if (inputRef.current?.value == "" || inputRef1.current?.value == "") return;
    await fetchCSR.requestWithHandler({
      url: "/api/site-bookmark",
      method: "POST",
      body: {
        siteBookmarkCategoryId: props.siteBookmarkCategoryId,
        name: inputRef.current?.value,
        url: inputRef1.current?.value,
      },
      showSuccessToast: true,
      successMessage: "카테고리 생성에 성공했습니다.",
      handleSuccess: (result: ISiteBookmark) => {
        siteBookmarkStore.setSiteBookmark({
          categoryId: props.siteBookmarkCategoryId,
          id: result!.id,
          name: result!.name,
          url: result!.url,
        });
            props.closeModal!();
      }
    });
  };
  
  const deleteSiteBookmark = async () => {
    if (deleteSiteBookmarkItem.id <= 0) return;
    await fetchCSR.requestWithHandler({
      url: `/api/site-bookmark?id=${deleteSiteBookmarkItem.id}`,
      method: "DELETE",
      showSuccessToast: true,
      successMessage: "카테고리 삭제 했습니다.",
      handleSuccess: () => {
        const _temp = siteBookmarkStore.siteBookmarkCategoryList.map((i) => {
          if (i.id == props.siteBookmarkCategoryId) {
            return {
              ...i,
              siteBookmarkList: i.siteBookmarkList.filter(
                (j) => deleteSiteBookmarkItem.id !== j.id,
              ),
            };
          }
          return i;
        });
        siteBookmarkStore.setInit(_temp);
      props.closeModal!();
      }
    });
  };

  return (
    <ModalTemplate style={{paddingBottom: "32px"}}>
      {props.closeButtonComponent}
      <section className="bg-white mb-6 w-full flex-col rounded-xl border-2 border-primary-80 p-4 pb-8 shadow-lg">
        <div className="mb-4 flex items-center">
          <IoIosAddCircleOutline size={28} className="mr-2 text-primary-60" />
          <h2 className="text-xl font-bold text-primary-80">
            북마크 생성
          </h2>
        </div>
        <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3">
          <ThemeInput1
            ref={inputRef}
            placeholder="이름을 입력"
            className="w-full rounded-lg border border-primary-40 px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-primary-60"
          />
          <ThemeInput1
            ref={inputRef1}
            placeholder="url 입력"
            className="w-full rounded-lg border border-primary-40 px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-primary-60"
          />
          <ThemeButton1 className="ml-2 p-0 transition-transform" onClick={createSiteBookmark}>
            <IoIosAddCircleOutline size={36} className="text-primary-60" />
          </ThemeButton1>
        </div>
      </section>

      <section className="bg-white w-full rounded-xl border-2 border-primary-80 p-4 shadow-lg flex flex-col gap-2">
        <div className="mb-2 flex items-center">
          <IoIosRemoveCircleOutline size={28} className="mr-2 text-red-400" />
          <h2 className="text-xl font-bold text-primary-80">
            북마크 삭제
          </h2>
        </div>
        <div className="relative w-full">
          {
            siteBookmarkStore.siteBookmarkCategoryList.filter(i => i.id == props.siteBookmarkCategoryId)[0]?.siteBookmarkList.map(j =>
              <ThemeActiveButton1 key={j.id} className={"px-3 py-2"} onClick={() => setDeleteSiteBookmarkItem({
                id: j.id,
                name: j.name
              })} isActive={j.id == deleteSiteBookmarkItem.id} > {j.name} </ThemeActiveButton1>
            )
          }
        </div>
        <ThemeButton1 className="w-full py-2" disabled={deleteSiteBookmarkItem.id <= 0} onClick={deleteSiteBookmark}> {deleteSiteBookmarkItem.id == 0 ? "삭제할 카테고리 선택하기" : `"${deleteSiteBookmarkItem.name}" 삭제하기`} </ThemeButton1>
      </section>
    </ModalTemplate>
  );
};
export default SiteBookmarkModal;