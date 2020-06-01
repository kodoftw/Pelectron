export interface BulletPosition {
  Top: number;
  Left: number;
}

export interface BulletCompletePosition {
  Top: number;
  Right: number;
  Bottom: number;
  Left: number;
}

export interface BulletVelocity {
  X: number;
  Y: number;
}

export interface BulletData {
  Id: number;
  Color: string;
  Position: BulletPosition;
  Velocity: BulletVelocity;
}
