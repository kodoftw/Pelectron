// @flow
import { ActionType, Bullet } from '../models';

import { SPAWN_BULLET } from '../actions/gameState';

// Services
import { SpawnerFactory } from '../services/SpawnerFactory';

type BulletsStateType = {
  bullets: Bullet[],
  counter: number
};

const initialState: BulletsStateType = {
    bullets: [],
    counter: 0
}

export default function score(state: BulletsStateType = initialState, action: ActionType) {
    let newState = Object.assign({}, state);
    switch (action.type)
    {
        case SPAWN_BULLET:
            newState.bullets.push(SpawnerFactory.Bullet(action.parameter));
            newState.counter = newState.bullets[newState.bullets.length - 1].id;
            return newState;

        default:
            return state;
    }
}