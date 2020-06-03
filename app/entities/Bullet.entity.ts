import { BulletData, BulletPosition, BulletCompletePosition } from '../models/Bullet';
import { GameConfig } from '../models/GameConfig';
import { MessageType } from '../models/Messages';

import CollisionDetector from '../services/CollisionDetector';
import Messenger from '../services/Messenger';

class BulletEntity {
  private maxTick: number;
  private outOfBoundsTopValue: number;
  private padCenter: number[] = [];
  private padHoveringIndex = -1;
  private yAcc: number;

  constructor(private bulletData: BulletData, private gameConfig: GameConfig) {
    this.maxTick = gameConfig.Bullet.DropTime / gameConfig.Tick;
    this.outOfBoundsTopValue = 100;
    // TODO: changing tick to higher values breaks yAcc
    this.yAcc = (2 * (gameConfig.Pad.Top - gameConfig.Bullet.Size)) / (this.maxTick * this.maxTick);

    this.initializePadCenter();
    this.updateXVelocityOnCollision();
  }

  public AdvanceTick(collisionChecker: CollisionDetector): void {
    const nextTickPosition = this.getNextTickPosition();

    if (collisionChecker.WillCollide(this.getCurrentCompletePosition(), nextTickPosition)) {
      Messenger.Send(MessageType.OnBulletPadCollision);
      this.onPadCollision();
    } else {
      this.bulletData.Position.Top = nextTickPosition.Top;
      this.bulletData.Position.Left = nextTickPosition.Left;
      this.bulletData.Velocity.Y += this.yAcc;
    }
  }

  public IsOutOfBounds(): boolean {
    return this.bulletData.Position.Top >= this.outOfBoundsTopValue;
  }

  public get Data(): BulletData {
    return this.bulletData;
  }

  private getCurrentPosition(): BulletPosition {
    return this.bulletData.Position;
  }

  private getCurrentCompletePosition(): BulletCompletePosition {
    const curPosition = this.getCurrentPosition();

    return {
      Top: curPosition.Top,
      Right: curPosition.Left + this.size,
      Bottom: curPosition.Top + this.size,
      Left: curPosition.Left,
    };
  }

  private getNextTickPosition(): BulletCompletePosition {
    const curPosition = this.getCurrentPosition();
    const nextTop = curPosition.Top + this.tickYMovement();
    const nextLeft = curPosition.Left + this.tickXMovement();

    return {
      Top: nextTop,
      Right: nextLeft + this.size,
      Bottom: nextTop + this.size,
      Left: nextLeft,
    };
  }

  private onPadCollision(): number {
    const maxVerticalMovement =
      this.gameConfig.Pad.Top - (this.bulletData.Position.Top + this.gameConfig.Bullet.Size);

    this.bulletData.Position.Top += maxVerticalMovement;

    const distanceRatio = maxVerticalMovement / this.tickYMovement();
    this.bulletData.Position.Left += this.tickXMovement() * distanceRatio;

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

  private tickXMovement(): number {
    return this.bulletData.Velocity.X;
  }

  private tickYMovement(): number {
    return this.bulletData.Velocity.Y + this.yAcc / 2;
  }

  private get size(): number {
    return this.gameConfig.Bullet.Size;
  }
}

export default BulletEntity;
