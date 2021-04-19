import React, { FC } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux'
import { createBrowserHistory, Location } from "history"
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension"
// import { } from "connected-react-router"
import "antd/dist/antd.css"

///
import Basic from '@layouts/Basic';
import { decrease, increase } from '@test/counter';
import rootReducer, { RootState } from '@test/store';
import myLogger from '@test/Logger';


// // render(
// //   <BrowserRouter>
// //     <Basic />
// //   </BrowserRouter>,
// //   document.getElementById('app'),
// // );
interface ICounter {
  number: number;
  onIncrease: any;
  onDecrease: any;
}
const Counter: FC<ICounter> = ({ number, onIncrease, onDecrease }) => {
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  )
}

const CounterContainer = () => {
  const number = useSelector((state: RootState) => state.counter);
  const dispath = useDispatch();

  const onIcrease = () => {
    dispath(increase())
  }
  const onDecrease = () => {
    dispath(decrease())
  }

  return (
    <Counter number={number} onIncrease={onIcrease} onDecrease={onDecrease} />
  )

}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(myLogger)));

render(
  <Provider store={store} >
    <CounterContainer />
  </Provider>,
  document.getElementById("app")
)
