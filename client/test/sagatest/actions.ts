import { SCORE_UP, SCORE_DOWN } from './constants';
export const socreUp = () => {
  return { type: SCORE_UP, score: 1 };
};

export const scoreDwon = () => {
  return { type: SCORE_DOWN, score: 1 };
};

export type ScoreAction = ReturnType<typeof socreUp> | ReturnType<typeof scoreDwon>;
