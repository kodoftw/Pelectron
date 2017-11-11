// @flow
import { ActionType, Bullet } from '../models';

import { SPAWN_BULLET, GAME_TICK } from '../actions/gameState';

import { BulletSpawnerFactory } from '../services/BulletSpawnerFactory';

type BulletsStateType = {
  bullets: BulletSpawn[],
  state: number
};

const initialState: BulletsStateType = {
    bullets: [],
    state: 0
}

export default function bullet(state: BulletsStateType = initialState, action: ActionType) {
    let newState = Object.assign({}, state);
    switch (action.type)
    {
        case SPAWN_BULLET:
            newState.bullets.push(BulletSpawnerFactory.SpawnBullet(action.parameter));
            newState.state++;
            return newState;

        case GAME_TICK:
            newState.bullets.forEach((_) => _.move(action.parameter * newState.bullets.indexOf(_)));
            newState.state++;
            return newState;

        default:
            return state;
    }
}