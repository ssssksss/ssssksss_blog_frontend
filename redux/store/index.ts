import { createStore } from "redux";
import rootReducer from "@/redux/store/reducers";
export const store = createStore(rootReducer);
