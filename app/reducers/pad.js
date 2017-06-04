// @flow
import { ActionType } from '../models';

import { LEFT, RIGHT } from '../actions/inputHandler';

type PadStateType = {
  position: number
};

const initialState: PadStateType = {
    position: 1
}

export default function pad(state: PadStateType = initialState, action: ActionType) {
    let newState = Object.assign({}, state);
    switch (action.type)
    {
        case LEFT:
            newState.position = state.position > 0 ? state.position - 1 : 0;
            return newState;

        case RIGHT:
            newState.position = state.position < 2 ? state.position + 1 : 2;
            return newState;

        default:
            return state;
    }
}