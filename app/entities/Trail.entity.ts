import { BulletData } from '../models/Bullet';
import { GameConfig } from '../models/GameConfig';

export default class TrailEntity {
  private readonly sizeReductionPerTick: number;
  private trailData: BulletData;
  private ticksToLive: number;

  constructor(bulletSource: BulletData, gameConfig: GameConfig) {
    this.trailData = bulletSource;
    this.ticksToLive = gameConfig.Trail.TicksToLive;

    this.sizeReductionPerTick = this.trailData.Size / this.ticksToLive;
  }

  public AdvanceTick(): void {
    this.ticksToLive--;
    this.reduceSize();
  }

  public IsAlive(): boolean {
    return this.ticksToLive >= 0;
  }

  public get Data(): BulletData {
    return this.trailData;
  }

  private reduceSize(): void {
    this.trailData.Size -= this.sizeReductionPerTick;
  }
}
