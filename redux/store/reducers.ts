import { combineReducers } from 'redux';
import { blogReducer } from './blog';
import { authReducer } from './auth';
import { scheduleReducer } from './schedule';
import { themeReducer } from './theme';
import { toastifyReducer } from './toastify/reducers';
import { leftNavItemReducer } from './leftNav';
import { blogContentTemplateReducer } from './blogContentTemplate';
import { todoReducer } from './todo';
import { memoReducer } from './memo';
import { boardReducer } from './board';
import loadingReducer from './loading';

const rootReducer = combineReducers({
  blogStore: blogReducer,
  authStore: authReducer,
  scheduleStore: scheduleReducer,
  themeStore: themeReducer,
  toastifyStore: toastifyReducer,
  leftNavItemStore: leftNavItemReducer,
  blogContentTemplateStore: blogContentTemplateReducer,
  todoStore: todoReducer,
  memoStore: memoReducer,
  boardStore: boardReducer,
  loadingStore: loadingReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
