import { ScoreAction } from './actions';
import { SCORE_UP, SCORE_DOWN, SCORE_UP_ASYNC, SCORE_DOWN_ASYNC } from './constants';

const initialState = {
  score: 0,
};

const CounterSagaReducer = (state = initialState, action: ScoreAction) => {
  const newState = { ...state };
  switch (action.type) {
    case SCORE_UP_ASYNC:
      newState.score += 1;
      return newState;
    case SCORE_DOWN_ASYNC:
      newState.score -= 1;
      return newState;
    // case SCORE_UP:
    //   newState.score += 1;
    //   return newState;
    // case SCORE_DOWN:
    //   newState.score -= 1;
    //   return newState;
    default:
      return newState;
  }
};

export type CounterSagaState = ReturnType<typeof CounterSagaReducer>;
export default CounterSagaReducer;
