import { BulletVelocity, BulletPosition } from '../models/Bullet';
import { GameConfig, BulletKineticsConfig } from '../models/GameConfig';

export default class BulletKinetics {
  private padIndex = 0;
  private currentPosition: BulletPosition;
  private currentVelocity: BulletVelocity;
  private kineticsConfig: BulletKineticsConfig;
  private verticalAcceleration: number;

  constructor(private gameConfig: GameConfig) {
    this.kineticsConfig = this.drawKineticsConfig();
    this.currentPosition = this.getInitialPosition();
    this.currentVelocity = this.kineticsConfig.InitialVelocity;
    this.verticalAcceleration = this.kineticsConfig.VerticalAcceleration;
  }

  public AdvanceTick(nextTickVelocity: BulletVelocity, nextTickPosition: BulletPosition): void {
    this.currentVelocity = nextTickVelocity;
    this.currentPosition = nextTickPosition;
  }

  public GetNextTickKinetics(): [BulletVelocity, BulletPosition] {
    const nextTickVelocity = this.nextTickVelocity();

    return [nextTickVelocity, this.nextTickPosition(nextTickVelocity)];
  }

  public OnPadCollision(): void {
    this.currentPosition = this.padCollisionPosition(this.padIndex);

    this.padIndex++;
    this.kineticsConfig = this.drawKineticsConfig();
    this.currentVelocity = this.kineticsConfig.InitialVelocity;
    this.verticalAcceleration = this.kineticsConfig.VerticalAcceleration;
  }

  public GetCurrentPosition(): BulletPosition {
    return this.currentPosition;
  }

  private drawKineticsConfig(): BulletKineticsConfig {
    const kineticsConfig = this.kineticsConfigurationForPad();
    const seed = this.drawRandomNumber(0, kineticsConfig.length - 1);

    return kineticsConfig[seed];
  }

  private kineticsConfigurationForPad(): BulletKineticsConfig[] {
    return this.padIndex === 0
      ? this.gameConfig.Kinetics.InitialKinetics
      : this.gameConfig.Kinetics.FollowUpKinetics;
  }

  private getInitialPosition(): BulletPosition {
    return {
      Left: 0,
      Top: 0,
    };
  }

  private padCollisionPosition(padIndex: number): BulletPosition {
    return {
      Top: this.gameConfig.Pad.Top - this.gameConfig.Bullet.Size,
      Left: this.padCenter(padIndex),
    };
  }

  private nextTickPosition(velocity: BulletVelocity): BulletPosition {
    return {
      Top: this.currentPosition.Top + velocity.Y * this.gameConfig.Tick,
      Left: this.currentPosition.Left + this.currentVelocity.X,
    };
  }

  private nextTickVelocity(): BulletVelocity {
    return {
      X: this.currentVelocity.X,
      Y: this.currentVelocity.Y + this.verticalAcceleration * this.gameConfig.Tick,
    };
  }

  private padCenter(index: number): number {
    return this.gameConfig.Kinetics.PadCenter[index];
  }

  /**
   * Returns a random integer between min (inclusive) and max (inclusive).
   * The value is no lower than min (or the next integer greater than min
   * if min isn't an integer) and no greater than max (or the next integer
   * lower than max if max isn't an integer).
   * Using Math.round() will give you a non-uniform distribution!
   */
  private drawRandomNumber(minValue: number, maxValue: number): number {
    const min = Math.ceil(minValue);
    const max = Math.floor(maxValue);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
