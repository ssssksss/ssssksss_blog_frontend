import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import useSiteBookmarkStore from "@store/siteBookmarkStore";
import { useState } from "react";

interface ISiteBookmarkCategoryDeleteListModal extends IModalComponent {
  deleteSiteBookmarkCategory: (siteBookmarkCategoryId: number) => void;
}
const SiteBookmarkCategoryDeleteListModal = (props: ISiteBookmarkCategoryDeleteListModal) => {
  const siteBookmarkStore = useSiteBookmarkStore();
  const [selectDeleteSiteBookmarkCategoryId, setSelectDeleteSiteBookmarkCategoryId] = useState(0);

  return (
    <ModalTemplate>
      {props.closeButtonComponent}
      <div className="mb-12 flex w-full flex-wrap gap-x-4">
        {siteBookmarkStore.siteBookmarkCategoryList.map((i) => (
          <ThemeActiveButton1
            className="h-[1.75rem] min-w-[5rem] cursor-pointer rounded-md bg-primary-20 p-2 default-flex hover:text-primary-contrast"
            key={i.id}
            onClick={() => setSelectDeleteSiteBookmarkCategoryId(i.id)}
            isActive={i.id == selectDeleteSiteBookmarkCategoryId}
          >
            {i.name}
          </ThemeActiveButton1>
        ))}
      </div>
      <ThemeActiveButton1
        className="w-full py-2"
        onClick={async () => {
          await props.deleteSiteBookmarkCategory(selectDeleteSiteBookmarkCategoryId);
          await props.closeModal!();
        }}
        isActive={selectDeleteSiteBookmarkCategoryId > 0}
        disabled={selectDeleteSiteBookmarkCategoryId <= 0}
      >
        삭제
      </ThemeActiveButton1>
    </ModalTemplate>
  );
};
export default SiteBookmarkCategoryDeleteListModal;