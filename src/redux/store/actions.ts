import authAction from './auth/actions';
import { blog1Action } from './blog';
import blogAction from './blog/actions';
import blogContentTemplateAction from './blogContentTemplate/actions';
import boardAction from './board/actions';
import { loadingAction } from './loading';
import memoAction from './memo/actions';
import scheduleAction from './schedule/actions';
import { themeAction } from './theme';
import toastifyAction from './toastify/actions';
import todoAction from './todo/actions';

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
  themeStore: themeAction,
  blogStore1: blog1Action,
};
