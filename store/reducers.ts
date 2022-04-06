import { combineReducers } from "redux";
import { categoryReducer } from "./category";

const rootReducer = combineReducers({
  category: categoryReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
