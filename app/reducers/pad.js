// @flow
import type { ActionType } from '../utils/actionType';

import { MOVE_LEFT, MOVE_RIGHT } from '../actions/pad';

export type padStateType = {
  padPosition: number
};

export default function pad(state: number = 1, action: ActionType) {
    console.log(`pad reducer: ${state} - ${action.type}`);
    switch (action.type)
    {
        default:
            return state;
    }
}