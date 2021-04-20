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
import rootReducer, { RootState } from '@test/store';
import myLogger from '@test/Logger';
import { increaseBy, decrease, increase } from '@test/posts';
interface ICounter {
  number: number;
  onIncrease: () => void;
  onDecrease: () => void;
  increaseBy: (diff: number) => void;
}
const Counter: FC<ICounter> = ({ number, onIncrease, onDecrease, increaseBy }) => {
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
      <button onClick={() => increaseBy(5)}>-1</button>
    </div>
  )
}

const CounterContainer = () => {
  const number = useSelector((state: RootState) => state.counter.counter);
  const dispath = useDispatch();

  const onIcrease = () => {
    dispath(increase())
  }
  const onDecrease = () => {
    dispath(decrease())
  }
  const onIncreaseBy = (diff: number) => {
    dispath(increaseBy(diff))
  }
  return (
    <Counter
      number={number}
      onIncrease={onIcrease}
      increaseBy={onIncreaseBy}
      onDecrease={onDecrease}
    />
  )

}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(myLogger)));

render(
  <Provider store={store} >
    <CounterContainer />
  </Provider>,
  document.getElementById("app")
)
