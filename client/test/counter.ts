import { delay, put, takeEvery, takeLatest } from "redux-saga/effects"

// 액션 타입
const INCREASE = 'INCREASE' as const;
const DECREASE = 'DECREASE' as const;
const INCREASE_ASYNC = 'INCREASE_ASYNC' as const;
const DECREASE_ASYNC = 'DECREASE_ASYNC' as const;

// 액션 생성 함수
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseAsync = () => ({ type: INCREASE_ASYNC });
export const decreaseAsync = () => ({ type: DECREASE_ASYNC });

// 초깃값 (상태가 객체가 아니라 그냥 숫자여도 상관 없습니다.)
const initialState = 0;
function* increaseSaga() {
    yield delay(1000)
    yield put(increase())
}

function* decreaseSaga() {
    yield delay(1000)
    yield put(decrease())
}

export function* conuterSaga() {
    yield takeEvery(INCREASE_ASYNC, increaseAsync)
    yield takeLatest(DECREASE_ASYNC, decreaseAsync)
}

export default function counter(state = initialState, action: any) {
    switch (action.type) {
        case INCREASE:
            return state + 1;
        case DECREASE:
            return state - 1;
        default:
            return state;
    }
}