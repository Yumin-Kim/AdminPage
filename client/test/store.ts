import { combineReducers } from "redux"
import { all } from "redux-saga/effects"
import counter, { conuterSaga } from "./counter"

const rootReducer = combineReducers({ counter })
export type RootState = ReturnType<typeof rootReducer>
export function* rootSaga() {
    yield all([conuterSaga()])
}
export default rootReducer;