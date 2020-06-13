import { BulletVelocity, BulletPosition } from '../models/Bullet';
import { GameConfig } from '../models/GameConfig';

class BulletKinetics {
  private padHoveringIndex = 0;
  private xVelocities: number[] = [];
  private currentPosition: BulletPosition;
  private currentVelocity: BulletVelocity;

  constructor(private gameConfig: GameConfig) {
    this.initializeVelocities();

    this.currentPosition = {
      Left: 0,
      Top: 0,
    };
    this.currentVelocity = {
      X: this.xVelocities[0],
      Y: 0,
    };
  }

  public AdvanceTick(nextTickVelocity: BulletVelocity, nextTickPosition: BulletPosition): void {
    this.currentVelocity = nextTickVelocity;
    this.currentPosition = nextTickPosition;
  }

  public getNextTickKinetics(): [BulletVelocity, BulletPosition] {
    const nextTickVelocity = this.nextTickVelocity();

    return [nextTickVelocity, this.nextTickPosition(nextTickVelocity)];
  }

  public OnPadCollision(): void {
    this.padHoveringIndex++;
    this.updatePositionOnPadCollision();
    this.updateVelocityOnPadCollision();
  }

  private updatePositionOnPadCollision(): void {
    this.currentPosition = {
      Top: this.gameConfig.Pad.Top - this.gameConfig.Bullet.Size,
      Left: this.padCenter(this.padHoveringIndex - 1),
    };
  }

  private updateVelocityOnPadCollision(): void {
    this.currentVelocity = {
      X: this.xVelocities[this.padHoveringIndex],
      Y: this.currentVelocity.Y * -0.9,
    };
  }

  public getCurrentPosition(): BulletPosition {
    return this.currentPosition;
  }

  private nextTickPosition(velocity: BulletVelocity): BulletPosition {
    return {
      Top: this.currentPosition.Top + velocity.Y * this.gameConfig.Tick,
      Left: this.currentPosition.Left + this.currentVelocity.X,
    };
  }

  private initializeVelocities(): void {
    const distances = [
      this.distanceToNextPad(0),
      this.distanceToNextPad(1),
      this.distanceToNextPad(2),
      this.distanceToNextPad(3),
    ];

    this.xVelocities = distances.map((d, i) => {
      return d / (this.dropTime(i) / this.gameConfig.Tick);
    });
  }

  private nextTickVelocity(): BulletVelocity {
    const yAcc = this.gameConfig.Bullet.Gravity;

    return {
      X: this.currentVelocity.X,
      Y: this.currentVelocity.Y + yAcc * this.gameConfig.Tick,
    };
  }

  private distanceToNextPad(padIndex: number): number {
    return padIndex === 0
      ? this.padCenter(0)
      : this.padCenter(padIndex) - this.padCenter(padIndex - 1);
  }

  private padCenter(index: number): number {
    return this.gameConfig.Kinetics.PadCenter[index];
  }

  private dropTime(index: number): number {
    return this.gameConfig.Kinetics.DropTimes[index];
  }
}

export default BulletKinetics;
