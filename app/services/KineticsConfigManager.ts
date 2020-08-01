import {
  PadConfig,
  BulletConfig,
  BulletKineticsConfig,
  KineticsConfig,
} from '../models/GameConfig';

export default class KineticsConfigManager {
  private firstDropGravity = 0.0001;
  private firstDropDeviation = [0.6, 0.8, 0.9, 1, 1.2, 1.3, 1.5, 1.8, 2, 2.2];
  private followUpDropGravity = 0.00008;
  private followUpDropDeviation = [0.2, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.8, 0.9];

  constructor(
    private bulletConfig: BulletConfig,
    private padConfig: PadConfig,
    private gameTick: number
  ) {}

  public KineticsConfig(): KineticsConfig {
    return {
      PadCenter: this.padCenters(),
      FreeFallAcceleration: this.firstDropGravity,
      InitialKinetics: this.initialKinetics(),
      FollowUpKinetics: this.followUpKinectics(),
    };
  }

  private initialKinetics(): BulletKineticsConfig[] {
    const gravity = this.firstDropGravity;
    const verticalTravelDistance = this.padConfig.Top - this.bulletConfig.Size;
    const horizontalTravelDistance = this.padCenters()[0];

    return this.firstDropDeviation.map(d => {
      const deviationGravity = gravity * d;
      const dropTime = this.calcDropTime(verticalTravelDistance, deviationGravity);

      return {
        DropTime: dropTime,
        InitialVelocity: {
          X: horizontalTravelDistance / (dropTime / this.gameTick),
          Y: 0,
        },
        VerticalAcceleration: deviationGravity,
      };
    });
  }

  private followUpKinectics(): BulletKineticsConfig[] {
    const gravity = this.followUpDropGravity;
    const verticalTravelDistance = this.padConfig.Top - this.bulletConfig.Size;
    // Assuming distance between pads are equal
    const horizontalTravelDistance = this.padCenters()[2] - this.padCenters()[1];

    return this.followUpDropDeviation.map(d => {
      const deviationVerticalTravelDistance = d * verticalTravelDistance;
      const dropTime = 2 * this.calcDropTime(deviationVerticalTravelDistance, gravity);

      return {
        DropTime: dropTime,
        InitialVelocity: {
          X: horizontalTravelDistance / (dropTime / this.gameTick),
          Y: -(gravity * (dropTime / 2)),
        },
        VerticalAcceleration: gravity,
      };
    });
  }

  private calcDropTime(height: number, verticalAcceleration: number): number {
    return ((2 * height) / verticalAcceleration) ** 0.5;
  }

  private padCenters(): number[] {
    const basePosition = this.padConfig.Padding - this.bulletConfig.Size / 2;

    return [
      basePosition + 0.5 * this.padConfig.Width,
      basePosition + 1.5 * this.padConfig.Width,
      basePosition + 2.5 * this.padConfig.Width,
      basePosition + 3.5 * this.padConfig.Width,
    ];
  }
}
