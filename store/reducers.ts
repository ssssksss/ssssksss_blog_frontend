import { combineReducers } from "redux";
import { categoryReducer } from "./category";
import { authReducer } from "./auth";

const rootReducer = combineReducers({
  categoryStore: categoryReducer,
  authStore: authReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
