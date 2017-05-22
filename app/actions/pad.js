export const MOVE_LEFT = 'MOVE_LEFT';
export const MOVE_RIGHT = 'MOVE_RIGHT';

export function MoveLeft() {
  return {
    type: MOVE_LEFT
  };
}

export function MoveRight() {
  return {
    type: MOVE_RIGHT
  };
}
