import PadEntity from '../entities/Pad.entity';
import { BulletCompletePosition } from '../models/Bullet';

class CollisionDetector {
  private pad: PadEntity | undefined;

  public WillCollide(
    previousPosition: BulletCompletePosition,
    nextPosition: BulletCompletePosition
  ): boolean {
    if (this.pad == null || previousPosition == null || nextPosition == null) {
      return false;
    }

    return (
      previousPosition.Bottom <= this.pad.Top &&
      nextPosition.Bottom >= this.pad.Top &&
      nextPosition.Left >= this.pad.Left &&
      nextPosition.Right <= this.pad.Right
    );
  }

  public SetPad(position: PadEntity): void {
    this.pad = position;
  }
}

export default CollisionDetector;
