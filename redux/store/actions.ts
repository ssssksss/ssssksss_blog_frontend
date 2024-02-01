import authAction from './auth/actions';
import blogAction from './blog/actions';
import toastifyAction from './toastify/actions';
import blogContentTemplateAction from './blogContentTemplate/actions';
import boardAction from './board/actions';
import scheduleAction from './schedule/actions';
import todoAction from './todo/actions';
import memoAction from './memo/actions';
import { loadingAction } from './loading';

export const rootActions = {
  blogStore: blogAction,
  authStore: authAction,
  toastifyStore: toastifyAction,
  blogContentTemplateStore: blogContentTemplateAction,
  boardStore: boardAction,
  scheduleStore: scheduleAction,
  todoStore: todoAction,
  memoStore: memoAction,
  loadingStore: loadingAction,
};
