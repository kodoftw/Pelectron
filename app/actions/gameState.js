export const SPAWN_BULLET = 'SPAWN_BULLET';

export function SpawnBullet(parameter) {
  return {
    type: SPAWN_BULLET,
    parameter
  };
}
