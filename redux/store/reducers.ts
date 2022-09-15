import { combineReducers } from "redux";
import { categoryReducer } from "./category";
import { authReducer } from "./auth";
import { todoReducer } from "./todo";

const rootReducer = combineReducers({
  categoryStore: categoryReducer,
  authStore: authReducer,
  todoStore: todoReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
