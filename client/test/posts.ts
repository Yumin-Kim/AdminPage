const INCREASE = "counter/INCREASE" as const;
const DECREASE = "counter/DECREASE" as const;
const INCREASE_BY = "counter/INCREASE_BY" as const;

export const increase = () => ({
    type: INCREASE
})

export const decrease = () => ({
    type: DECREASE
})

export const increaseBy = (diff: number) => ({
    type: INCREASE_BY,
    payload: diff
})

type CounterActions = ReturnType<typeof increase> | ReturnType<typeof decrease> | ReturnType<typeof increaseBy>

type CounterState = {
    counter: number
}

const initialState: CounterState = {
    counter: 1,
}

export default function counter(state: CounterState = initialState, action: CounterActions) {
    switch (action.type) {
        case INCREASE:
            console.log(state.counter + 1);

            return { counter: state.counter + 1 }
        case DECREASE:
            return { counter: state.counter - 1 }
        case INCREASE_BY:
            console.log(state.counter + 1);
            return { counter: state.counter + action.payload }
        default:
            return state
    }

}
