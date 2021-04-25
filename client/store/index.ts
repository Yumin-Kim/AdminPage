import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import RootSaga from '../sagas/index';
import RootReducer from '../reducers/index';
const sagaMiddleware = createSagaMiddleware();

const configure = () => {
  let store;
  const middlewares = [sagaMiddleware];
  store = createStore(RootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
  sagaMiddleware.run(RootSaga);
  return store;
};

export default configure;
