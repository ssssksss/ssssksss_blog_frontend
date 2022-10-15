import { combineReducers } from "redux";
import { categoryReducer } from "./category";
import { authReducer } from "./auth";
import { planReducer } from "./plan";

const rootReducer = combineReducers({
  categoryStore: categoryReducer,
  authStore: authReducer,
  planStore: planReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
