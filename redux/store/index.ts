import { applyMiddleware, createStore } from 'redux';
import rootReducer from '@/redux/store/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const testMiddleware = (store: any) => dispatch => action => {
  //   console.log('index.ts 파일 : ', store);
  //   console.log('index.ts 파일 : ', store.getState());
  //   console.log('index.ts 파일 : ', action);
  return dispatch(action);
};

export const store = createStore(
  rootReducer,
  ['Use Redux'],
  composeWithDevTools(applyMiddleware(testMiddleware))
);
