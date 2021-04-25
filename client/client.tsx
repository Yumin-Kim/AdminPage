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
import App from '@pages/index';
import configure from '@store/index';

const store = configure();
render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
