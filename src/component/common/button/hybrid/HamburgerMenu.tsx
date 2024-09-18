
/**
 * Author : Sukyung Lee
 * FileName: HamburgerMenu.tsx
 * Date: 2022-07-17 03:08:42
 * Description : 햄버거 메뉴 버튼
 */

interface IHamburgerMenuProps {
  isHideMenu: boolean;
  onClickHideMenu: () => void;
}

/**
 * @param isHideMenu: boolean;
 * @param onClickHideMenu: () => void;
 */
const HamburgerMenu = (props: IHamburgerMenuProps) => {
  return (
    <button
      className={
        'relative w-12 h-12 flex justify-center items-center p-0 outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20'
      }
      onClick={props.onClickHideMenu}
      type="button"
    >
      <div
        className={`
          absolute w-8 h-1 bg-black-100 rounded-md transition-all duration-300 ease-in-out 
          ${props.isHideMenu ? 'top-1/2 transform -translate-y-1/2 -rotate-45': 'bottom-3'}
          `}
      />
      <div
        className={`
          absolute w-8 h-1 bg-black-100 rounded-md transition-all duration-300 ease-in-out 
          ${props.isHideMenu ?  'hidden':'top-1/2 -translate-y-1/2'}
          `}
      />
      <div
        className={`
          absolute w-8 h-1 bg-black-100 rounded-md transition-all duration-300 ease-in-out 
          ${props.isHideMenu ? 'top-1/2 transform -translate-y-1/2 rotate-45': 'top-3'}
          `}
      />
    </button>
  );
};

export default HamburgerMenu;
