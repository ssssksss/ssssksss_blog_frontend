import { combineReducers } from "redux";
import { categoryReducer } from "./category";
import { authReducer } from "./auth";

const rootReducer = combineReducers({
  category: categoryReducer,
  auth: authReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
