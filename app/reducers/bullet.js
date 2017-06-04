// @flow
import { ActionType, Bullet } from '../models';

import { SPAWN_BULLET } from '../actions/gameState';

import { SpawnerFactory } from '../libs/SpawnerFactory';

type GameStateType = {
  bullets: Bullet[]
};

const initialState: GameStateType = {
    bullets: []
}

export default function score(state: GameStateType = initialState, action: ActionType) {
    let newState = Object.assign({}, state);
    switch (action.type)
    {
        case SPAWN_BULLET:
            newState.bullets.push = SpawnerFactory.Bullet(action.parameter);
            return newState;

        default:
            return state;
    }
}