import { PadPosition } from './Pad';

export interface GameConfig {
  Tick: number;
  Bullet: BulletConfig;
  Pad: PadConfig;
}

export interface BulletConfig {
  DropTime: number;
  SpawnRate: number;
  Size: number;
}

export interface PadConfig {
  Position: PadPosition;
  Width: number;
  Top: number;
  Padding: number;
}
