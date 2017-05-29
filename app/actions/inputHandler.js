export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';

export function Left(parameter) {
  return {
    type: LEFT,
    parameter
  };
}

export function Right(parameter) {
  return {
    type: RIGHT,
    parameter
  };
}
