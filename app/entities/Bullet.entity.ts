import { BulletData, BulletPosition } from '../models/Bullet';
import { GameConfig } from '../models/GameConfig';

import CollisionDetector from '../services/CollisionDetector';

class BulletEntity {
  private collisionThreshold: number;
  private maxTick: number;
  private outOfBoundsTopValue: number;
  private padCenter: number[] = [];
  private padHoveringIndex = -1;
  private yAcc: number;

  constructor(private bulletData: BulletData, private gameConfig: GameConfig) {
    this.collisionThreshold = this.gameConfig.Pad.Top * 0.9;
    this.maxTick = gameConfig.Bullet.DropTime / gameConfig.Tick;
    this.outOfBoundsTopValue = 100 + this.gameConfig.Bullet.Size;
    this.yAcc = (2 * (gameConfig.Pad.Top - gameConfig.Bullet.Size)) / (this.maxTick * this.maxTick);

    this.initializePadCenter();
    this.updateXVelocityOnCollision();
  }

  public AdvanceTick(collisionChecker: CollisionDetector): void {
    const nextTickPosition = this.getNextTickPosition();

    if (
      this.canCollide() &&
      collisionChecker.WillCollide(this.bulletData.Position, nextTickPosition)
    ) {
      this.onPadCollision();
    } else {
      this.bulletData.Position = nextTickPosition;
      this.bulletData.Velocity.Y += this.yAcc;
    }
  }

  // TODO: remove bullets when OOB
  public IsOutOfBounds(): boolean {
    return this.bulletData.Position.Y >= this.outOfBoundsTopValue;
  }

  public get Data(): BulletData {
    return this.bulletData;
  }

  private getNextTickPosition(): BulletPosition {
    return {
      X: this.bulletData.Position.X + this.tickXMovement,
      Y: this.bulletData.Position.Y + this.tickYMovement,
    };
  }

  private canCollide(): boolean {
    return this.bulletData.Position.Y > this.collisionThreshold;
  }

  private onPadCollision(): number {
    const maxVerticalMovement =
      this.gameConfig.Pad.Top - (this.bulletData.Position.Y + this.gameConfig.Bullet.Size);
    const distanceRatio = maxVerticalMovement / this.tickYMovement;

    this.bulletData.Position.Y += maxVerticalMovement;
    this.bulletData.Position.X += this.tickXMovement * distanceRatio;

    this.updateVelocityAfterCollision();

    return distanceRatio;
  }

  private updateVelocityAfterCollision(): void {
    this.updateXVelocityOnCollision();
    this.InvertYVelocityOnCollision();
  }

  private InvertYVelocityOnCollision(): void {
    this.bulletData.Velocity.Y *= -1;
  }

  private updateXVelocityOnCollision(): void {
    this.padHoveringIndex++;

    if (this.padHoveringIndex === 0) {
      this.bulletData.Velocity.X = this.padCenter[0] / this.maxTick;
    } else {
      const distance =
        this.padCenter[this.padHoveringIndex] - this.padCenter[this.padHoveringIndex - 1];
      this.bulletData.Velocity.X = (0.5 * distance) / this.maxTick;
    }
  }

  private initializePadCenter(): void {
    const padConfig = this.gameConfig.Pad;
    const bulletConfig = this.gameConfig.Bullet;
    this.padCenter = [
      padConfig.Padding + 0.5 * padConfig.Width - 0.5 * bulletConfig.Size,
      padConfig.Padding + 1.5 * padConfig.Width - 0.5 * bulletConfig.Size,
      padConfig.Padding + 2.5 * padConfig.Width - 0.5 * bulletConfig.Size,
    ];
  }

  private get tickXMovement(): number {
    return this.bulletData.Velocity.X;
  }

  private get tickYMovement(): number {
    return this.bulletData.Velocity.Y + this.yAcc / 2;
  }
}

export default BulletEntity;
