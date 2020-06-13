import { PadPosition } from './Pad';

export interface GameConfig {
  Bullet: BulletConfig;
  Pad: PadConfig;
  Kinetics: KineticsConfig;
  Tick: number;
}

export interface BulletConfig {
  Gravity: number;
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
  DropTimes: number[];
  PadCenter: number[];
}
