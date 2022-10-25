import { combineReducers } from "redux";
import { categoryReducer } from "./category";
import { authReducer } from "./auth";
import { scheduleReducer } from "./schedule";

const rootReducer = combineReducers({
  categoryStore: categoryReducer,
  authStore: authReducer,
  scheduleStore: scheduleReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
