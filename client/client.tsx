import React, { FC } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { createBrowserHistory, Location } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { } from "connected-react-router" https://hokeydokey.tistory.com/74?category=783109 현재 redux + router를 사용 하지 않기 때문에 BrowserRouter상ㅇ
import 'antd/dist/antd.css';
///
import Basic from '@layouts/Basic';
import rootReducer, { RootState } from '@test/store';
import myLogger from '@test/Logger';
import TodoApp from '@test/Components/TodoApp';
import thunk from 'redux-thunk';
import { CounterSagaState } from './test/sagatest/reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '@test/sagatest/saga';
import App from '@pages/index';
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
// sagaMiddleware.run(rootSaga);
render(
  // <Provider store={store}>
  // </Provider>,
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app'),
);
