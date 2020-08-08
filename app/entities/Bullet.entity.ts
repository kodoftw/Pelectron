import { BulletData } from '../models/Bullet';
import { GameConfig } from '../models/GameConfig';
import { CompletePosition, Position } from '../models/Kinetics';

import { OnBulletPadCollisionMessage } from '../messages/OnBulletPadCollisionMessage';

import CollisionDetector from '../services/CollisionDetector';
import Messenger from '../services/Messenger';

import BulletKinetics from './BulletKinetics';

export default class BulletEntity {
  private kinetics: BulletKinetics;
  private outOfBoundsLeftValue = 100;
  private outOfBoundsTopValue = 100;
  private ignoreMovementTicks = 0;
  private numTicksSkippedAfterCollision = 2;

  constructor(private bulletData: BulletData, gameConfig: GameConfig) {
    this.kinetics = new BulletKinetics(gameConfig);
  }

  public AdvanceTick(collisionChecker: CollisionDetector): void {
    if (this.ignoreMovementTicks > 0) {
      // ignore movement so the bullet seems like it did hit the pad
      this.ignoreMovementTicks--;
      return;
    }
    const [nextTickVelocity, nextTickPosition] = this.kinetics.GetNextTickKinetics();
    const currentCompletePosition = this.toCompletePosition(this.kinetics.GetCurrentPosition());
    const nextCompletePosition = this.toCompletePosition(nextTickPosition);

    if (collisionChecker.WillCollide(currentCompletePosition, nextCompletePosition)) {
      this.ignoreMovementTicks = this.numTicksSkippedAfterCollision;
      this.sendOnCollisionMessage();
      this.kinetics.OnPadCollision();
    } else {
      this.kinetics.AdvanceTick(nextTickVelocity, nextTickPosition);
    }
  }

  public IsAlive(): boolean {
    return !this.isOutOfBounds();
  }

  public get Data(): BulletData {
    return this.bulletData;
  }

  public get Position(): Position {
    return this.kinetics.GetCurrentPosition();
  }

  public get Size(): number {
    return this.bulletData.Size;
  }

  private toCompletePosition(position: Position): CompletePosition {
    return {
      Top: position.Top,
      Right: position.Left + this.Size,
      Bottom: position.Top + this.Size,
      Left: position.Left,
    };
  }

  private isOutOfBounds(): boolean {
    return (
      this.Position.Top >= this.outOfBoundsTopValue ||
      this.Position.Left >= this.outOfBoundsLeftValue
    );
  }

  private sendOnCollisionMessage(): void {
    Messenger.SendMessage(new OnBulletPadCollisionMessage());
  }
}
