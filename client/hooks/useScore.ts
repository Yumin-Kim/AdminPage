import { useSelector, useDispatch } from 'react-redux';
import { CounterSagaState } from '../test/sagatest/reducer';
import { useCallback } from 'react';
import { socreUp, scoreDwon } from '../test/sagatest/actions';

export default function useScore() {
  const { score } = useSelector((state: CounterSagaState) => state);
  const dispatch = useDispatch();

  const onScoreUp = useCallback(() => {
    dispatch(socreUp());
  }, [dispatch]);
  const onScoreDown = useCallback(() => {
    dispatch(scoreDwon());
  }, [dispatch]);

  return { score, onScoreUp, onScoreDown };
}
