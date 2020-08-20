import { PadPosition } from './Pad';
import { Velocity } from './Kinetics';

export interface GameConfig {
  Bullet: BulletConfig;
  Kinetics: KineticsConfig;
  Pad: PadConfig;
  Tick: number;
  Trail: TrailConfig;
}

export interface BulletConfig {
  SpawnRate: number;
  Size: number;
}

export interface BulletKineticsConfig {
  DropTime: number;
  InitialVelocity: Velocity;
  VerticalAcceleration: number;
}

export interface KineticsConfig {
  FreeFallAcceleration: number;
  PadCenter: number[];
  FollowUpKinetics: BulletKineticsConfig[];
  InitialKinetics: BulletKineticsConfig[];
}

export interface PadConfig {
  Position: PadPosition;
  Width: number;
  Top: number;
  Padding: number;
}

export interface TrailConfig {
  CreationTickInterval: number;
  TicksToLive: number;
}
