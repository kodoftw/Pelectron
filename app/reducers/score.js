// @flow
import { ActionType } from '../models';

import { SET_SCORE } from '../actions/gameScreen';

type ScoreStateType = {
  score: number
};

const initialState: ScoreStateType = {
    score: 0
}

export default function score(state: ScoreStateType = initialState, action: ActionType) {
    let newState = Object.assign({}, state);
    switch (action.type)
    {
        case SET_SCORE:
            newState.score = action.value;
            return newState;

        default:
            return state;
    }
}