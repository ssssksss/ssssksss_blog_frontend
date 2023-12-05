import { combineReducers } from 'redux';
import { blogReducer } from './blog';
import { authReducer } from './auth';
import { scheduleReducer } from './schedule';
import { themeReducer } from './theme';
import { toastifyReducer } from './toastify/reducers';
import { leftNavItemReducer } from './leftNav';
import { blogContentTemplateReducer } from './blogContentTemplate';

const rootReducer = combineReducers({
  blogStore: blogReducer,
  authStore: authReducer,
  scheduleStore: scheduleReducer,
  themeStore: themeReducer,
  toastifyStore: toastifyReducer,
  leftNavItemStore: leftNavItemReducer,
  blogContentTemplateStore: blogContentTemplateReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
