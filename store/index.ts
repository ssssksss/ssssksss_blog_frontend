import { createStore } from "redux";
import rootReducer from "@/store/reducers";
export const store = createStore(rootReducer);
