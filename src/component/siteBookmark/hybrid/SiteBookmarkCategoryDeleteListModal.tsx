import ThemeButton1 from "@component/common/button/ThemeButton1";
import ThemeButton2 from "@component/common/button/ThemeButton2";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";

interface ISiteBookmarkCategoryDeleteListModal extends IModalComponent {

}
const SiteBookmarkCategoryDeleteListModal = (props: ISiteBookmarkCategoryDeleteListModal) => {
  return (
    <ModalTemplate>
      {props.closeButtonComponent}
      <div className="mb-12 flex gap-x-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <ThemeButton2
            className="h-[1.75rem] min-w-[5rem] py-3 px-1 default-flex"
            key={i}
          >
              i
          </ThemeButton2>
        ))}
      </div>
      <ThemeButton1 className="w-full py-2" onClick={()=>props.closeModal}>삭제</ThemeButton1>
    </ModalTemplate>
  );
};
export default SiteBookmarkCategoryDeleteListModal;