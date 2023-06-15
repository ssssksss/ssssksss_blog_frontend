import { combineReducers } from "redux";
import { categoryReducer } from "./category";
import { authReducer } from "./auth";
import { scheduleReducer } from "./schedule";
import { themeReducer } from "./theme";
import { toastifyReducer } from "./toastify/reducers";

const rootReducer = combineReducers({
  categoryStore: categoryReducer,
  authStore: authReducer,
  scheduleStore: scheduleReducer,
  themeStore: themeReducer,
  toastifyStore: toastifyReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
