export interface BulletPosition {
  X: number;
  Y: number;
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
