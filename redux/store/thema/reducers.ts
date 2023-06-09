import theme from "@/styles/theme";

const initialState = {
  // currentScheduleDate: dateFormat4y2m2d(new Date()),
  mainBackgroundColor: theme.thema.thema_blue.mainBackgroundColor,
  mainFontColor: theme.thema.thema_blue.mainFontColor,
  hoverBackgroundStyle: theme.thema.thema_blue.hoverBackgroundStyle,
  hoverFontStyle: theme.thema.thema_blue.hoverFontStyle,
  hoverBorderRadius: theme.thema.thema_blue.hoverBorderRadius,
};

export const themaReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "THEMA":
      return {
        ...state,
        mainBackgroundColor: action.payload,
        mainFontColor: action.payload,
        hoverBackgroundStyle: action.payload,
        hoverFontStyle: action.payload,
        hoverBorderRadius: action.payload,
      };
    default:
      return state;
  }
};
