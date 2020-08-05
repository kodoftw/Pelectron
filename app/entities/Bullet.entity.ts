import { BulletData } from '../models/Bullet';
import { CompletePosition, Position } from '../models/Kinetics';
import { GameConfig } from '../models/GameConfig';
import { MessageType } from '../models/Messages';
import CollisionDetector from '../services/CollisionDetector';
import Messenger from '../services/Messenger';

import BulletKinetics from './BulletKinetics';

export default class BulletEntity {
  private kinetics: BulletKinetics;
  private outOfBoundsLeftValue = 100;
  private outOfBoundsTopValue = 100;
  private ignoreMovementTicks = 0;
  private numTicksSkippedAfterCollision = 2;

  constructor(private bulletData: BulletData, private gameConfig: GameConfig) {
    this.kinetics = new BulletKinetics(this.gameConfig);
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
      Messenger.Send(MessageType.OnBulletPadCollision);
      this.kinetics.OnPadCollision();
    } else {
      this.kinetics.AdvanceTick(nextTickVelocity, nextTickPosition);
    }
  }

  public IsOutOfBounds(): boolean {
    return (
      this.Position.Top >= this.outOfBoundsTopValue ||
      this.Position.Left >= this.outOfBoundsLeftValue
    );
  }

  public get Data(): BulletData {
    return this.bulletData;
  }

  public get Position(): Position {
    return this.kinetics.GetCurrentPosition();
  }

  private toCompletePosition(position: Position): CompletePosition {
    return {
      Top: position.Top,
      Right: position.Left + this.size,
      Bottom: position.Top + this.size,
      Left: position.Left,
    };
  }

  private get size(): number {
    return this.gameConfig.Bullet.Size;
  }
}
