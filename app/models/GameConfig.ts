import { PadPosition } from './Pad';
import { BulletVelocity } from './Bullet';

export interface GameConfig {
  Bullet: BulletConfig;
  Pad: PadConfig;
  Kinetics: KineticsConfig;
  Tick: number;
}

export interface BulletConfig {
  SpawnRate: number;
  Size: number;
}

export interface PadConfig {
  Position: PadPosition;
  Width: number;
  Top: number;
  Padding: number;
}

export interface KineticsConfig {
  FreeFallAcceleration: number;
  PadCenter: number[];
  FollowUpKinetics: BulletKineticsConfig[];
  InitialKinetics: BulletKineticsConfig[];
}

export interface BulletKineticsConfig {
  DropTime: number;
  InitialVelocity: BulletVelocity;
  VerticalAcceleration: number;
}
