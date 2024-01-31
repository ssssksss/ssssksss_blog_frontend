import { applyMiddleware, createStore } from 'redux';
import rootReducer from '@/redux/store/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const testMiddleware = (store: any) => dispatch => action => {
  return dispatch(action);
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(testMiddleware))
);
