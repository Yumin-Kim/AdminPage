import { combineReducers } from "redux"
import { all } from "redux-saga/effects"
import counter from "./posts";
import todos from "./todo";
// import counter, { conuterSaga } from "./counter"
const rootReducer = combineReducers({ counter, todos })
// export type RootState = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof rootReducer>
// export function* rootSaga() {
//     yield all([conuterSaga()])
// }
export default rootReducer;