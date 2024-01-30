import authAction from './auth/actions';
import blogAction from './blog/actions';
import toastifyAction from './toastify/actions';
import blogContentTemplateAction from './blogContentTemplate/actions';
import boardAction from './board/actions';

export const rootActions = {
  blogStore: blogAction,
  authStore: authAction,
  toastifyStore: toastifyAction,
  blogContentTemplateStore: blogContentTemplateAction,
  boardStore: boardAction,
};
