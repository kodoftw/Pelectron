// @flow
import type { ActionType } from '../utils/actionType';

import { SET_SCORE } from '../actions/mainScreen';

export type scoreStateType = {
  score: number
};

export default function score(state: number = 0, action: ActionType) {
    switch (action.type)
    {
        case SET_SCORE:
            return action.value;

        default:
            return state;
    }
}