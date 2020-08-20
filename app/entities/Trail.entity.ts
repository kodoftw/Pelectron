import { GameConfig } from '../models/GameConfig';
import { TrailData } from '../models/Trail';

export default class TrailEntity {
  private readonly sizeReductionPerTick: number;
  private trailData: TrailData;
  private ticksToLive: number;

  constructor(trailData: TrailData, gameConfig: GameConfig) {
    this.trailData = trailData;
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

  public get Data(): TrailData {
    return this.trailData;
  }

  private reduceSize(): void {
    this.trailData.Size -= this.sizeReductionPerTick;
  }
}
