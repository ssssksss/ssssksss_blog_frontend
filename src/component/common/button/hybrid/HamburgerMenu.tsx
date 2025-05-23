/**
 * Author : Sukyung Lee
 * FileName: HamburgerMenu.tsx
 * Date: 2022-07-17 03:08:42
 * Description : 햄버거 메뉴 버튼
 */

interface IHamburgerMenuProps {
  isHideMenu: boolean;
  onClickHideMenu: () => void;
  ariaLabel?: string;
}

/**
 * @param isHideMenu: boolean;
 * @param onClickHideMenu: () => void;
 */
const HamburgerMenu = (props: IHamburgerMenuProps) => {
  return (
    <button
      className={"relative flex h-12 w-12 items-center justify-center p-0"}
      onClick={props.onClickHideMenu}
      type="button"
      aria-label={props.ariaLabel || "햄버거 버튼"}
    >
      <div
        className={`absolute h-1 w-8 rounded-md bg-black-100 transition-all duration-300 ease-in-out ${props.isHideMenu ? "top-1/2 -translate-y-1/2 -rotate-45 transform" : "bottom-3"} `}
      />
      <div
        className={`absolute h-[4px] w-8 rounded-md bg-black-100 transition-all duration-300 ease-in-out ${props.isHideMenu ? "hidden" : "top-1/2 -translate-y-1/2"} `}
      />
      <div
        className={`absolute h-1 w-8 rounded-md bg-black-100 transition-all duration-300 ease-in-out ${props.isHideMenu ? "top-1/2 -translate-y-1/2 rotate-45 transform" : "top-3"} `}
      />
    </button>
  );
};

export default HamburgerMenu;
