import { blogAction } from '@redux/store/blog';
import authAction from './auth/actions';
import blogContentTemplateAction from './blogContentTemplate/actions';
import { boardAction } from './board';
import { loadingAction } from './loading';
import memoAction from './memo/actions';
import { reactPlayerAction } from './reactPlayer';
import scheduleAction from './schedule/actions';
import { themeAction } from './theme';
import toastifyAction from './toastify/actions';
import todoAction from './todo/actions';

export const rootActions = {
  authStore: authAction,
  toastifyStore: toastifyAction,
  blogContentTemplateStore: blogContentTemplateAction,
  boardStore: boardAction,
  scheduleStore: scheduleAction,
  todoStore: todoAction,
  memoStore: memoAction,
  loadingStore: loadingAction,
  themeStore: themeAction,
  blogStore: blogAction,
  reactPlayerStore: reactPlayerAction,
};
