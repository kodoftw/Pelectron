import PadEntity from '../entities/Pad.entity';
import { BulletPosition } from '../models/Bullet';

class CollisionDetector {
  private pad: PadEntity | undefined;

  public WillCollide(previousPosition: BulletPosition, nextPosition: BulletPosition): boolean {
    if (this.pad == null || previousPosition == null || nextPosition == null) {
      return false;
    }

    return (
      previousPosition.Y <= this.pad.Top &&
      nextPosition.Y >= this.pad.Top &&
      nextPosition.X >= this.pad.Left &&
      nextPosition.X <= this.pad.Right
    );
  }

  public SetPad(position: PadEntity): void {
    this.pad = position;
  }
}

export default CollisionDetector;
