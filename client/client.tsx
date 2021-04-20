import React, { FC } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { createBrowserHistory, Location } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { } from "connected-react-router"
import 'antd/dist/antd.css';

///
import Basic from '@layouts/Basic';
import rootReducer, { RootState } from '@test/store';
import myLogger from '@test/Logger';
import TodoApp from '@test/Components/TodoApp';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

render(
  <Provider store={store}>
    <TodoApp />
    {/* <CounterContainer /> */}
  </Provider>,
  document.getElementById('app'),
);
