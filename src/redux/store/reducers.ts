import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { blogReducer } from './blog';
import { blogContentTemplateReducer } from './blogContentTemplate';
import { boardReducer } from './board';
import { leftNavItemReducer } from './leftNav';
import loadingReducer from './loading';
import { memoReducer } from './memo';
import { scheduleReducer, scheduleSlice } from './schedule';
import { themeSlice } from './theme';
import { toastifyReducer } from './toastify/reducers';
import { todoReducer } from './todo';

const rootReducer = combineReducers({
  authStore: authReducer,
  scheduleStore: scheduleReducer,
  toastifyStore: toastifyReducer,
  leftNavItemStore: leftNavItemReducer,
  blogContentTemplateStore: blogContentTemplateReducer,
  todoStore: todoReducer,
  memoStore: memoReducer,
  boardStore: boardReducer,
  loadingStore: loadingReducer,
  scheduleStore1: scheduleSlice.reducer,
  themeStore: themeSlice.reducer,
  blogStore: blogReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
