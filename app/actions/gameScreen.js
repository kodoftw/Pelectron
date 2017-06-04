export const SET_SCORE = 'SET_SCORE';

export function SetScore(parameter) {
  return {
    type: SET_SCORE,
    parameter
  };
}