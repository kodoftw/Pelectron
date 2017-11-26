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
            for (let i = 0; i < newState.bullets.length; i++) {
                const bullet = newState.bullets[i];
                const nextPosition = bullet.GetNextPosition();

                if (bullet.CanCollide(nextPosition) && CollisionDetection.Check(bullet, nextPosition)) {
                    const ratio = bullet.OnPadCollision();
                    bullet.Move(ratio);
                } else {
                    bullet.Move();
                }
            }
            newState.state++;

            return newState;

        default:
            return state;
    }
}