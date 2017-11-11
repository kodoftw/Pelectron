export const SPAWN_BULLET = 'SPAWN_BULLET';
export const GAME_TICK = 'GAME_TICK';

export function SpawnBullet(parameter) {
  return {
    type: SPAWN_BULLET,
    parameter
  };
}

export function GameTick(parameter) {
  return {
    type: GAME_TICK,
    parameter
  };
}
