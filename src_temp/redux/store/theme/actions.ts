export type ACTION_INSTANCE = ReturnType<typeof SET_NAVBAR_THEME>;

type NAVBAR_THEME_STATE = {
  menuBackground: string;
  menuIconBackground: string;
  menuIconFont: string;
  menuIconFontColor: string;
  HoverMenuIconBackground: string;
  HoverMenuIconFontColor: string;
};
/**
 * @param 배경색 테마를 지정하는 함수
 */
export const SET_NAVBAR_THEME = (payload: NAVBAR_THEME_STATE) => {
  return {
    type: "LEFT_NAVBAR",
    payload: payload,
  };
};
