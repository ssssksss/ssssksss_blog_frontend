import navbarTheme from "@/styles/navbarTheme";
import * as actions from "./actions";

const initialState = {
  menuBackground: navbarTheme.theme.theme1.menuBackground,
  menuIconBackground: navbarTheme.theme.theme1.menuIconBackground,
  menuIconFont: navbarTheme.theme.theme1.menuIconFont,
  menuIconFontColor: navbarTheme.theme.theme1.menuIconFontColor,
  HoverMenuIconBackground: navbarTheme.theme.theme1.HoverMenuIconBackground,
  HoverMenuIconFontColor: navbarTheme.theme.theme1.HoverMenuIconFontColor,
};

export const themeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "LEFT_NAVBAR":
      return {
        ...state,
        menuBackground: action.payload.menuBackground,
        menuIconBackground: action.payload.menuIconBackground,
        menuIconFont: action.payload.menuIconFont,
        menuIconFontColor: action.payload.menuIconFontColor,
        HoverMenuIconBackground: action.payload.HoverMenuIconBackground,
        HoverMenuIconFontColor: action.payload.HoverMenuIconFontColor,
      };
    default:
      return state;
  }
};
