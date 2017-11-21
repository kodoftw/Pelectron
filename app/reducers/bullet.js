// @flow
import { ActionType, Bullet } from '../models';

import { SPAWN_BULLET, GAME_TICK } from '../actions/gameState';

import { BulletSpawnerFactory, CollisionDetection } from '../services/index';

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
            const newBullet = BulletSpawnerFactory.SpawnBullet(
                action.parameter.config,
                action.parameter.gameConfiguration);
            newState.bullets.push(newBullet);
            newState.state++;

            return newState;

        case GAME_TICK:
            newState.bullets
                .filter((_) => _.Move())
                .filter((_) => CollisionDetection.Check(_))
                .forEach((_) => _.OnPadCollision());
            newState.state++;

            return newState;

        default:
            return state;
    }
}