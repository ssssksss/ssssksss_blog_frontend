export type ACTION_INSTANCE = ReturnType<typeof SET_THEMA>;

type THEMA_STATE = {
  mainBackgroundColor: string;
  mainFontColor: string;
  hoverBackgroundStyle: string;
  hoverFontStyle: string;
  hoverBorderRadius: string;
};
/**
 * @param 배경색 테마를 지정하는 함수
 */
export const SET_THEMA = (payload: THEMA_STATE) => {
  return {
    type: "THEMA",
    payload: payload,
  };
};
