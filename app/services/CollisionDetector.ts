import PadEntity from '../entities/Pad.entity';
import { CompletePosition } from '../models/Kinetics';

class CollisionDetector {
  private pad: PadEntity | undefined;

  public WillCollide(previousPosition: CompletePosition, nextPosition: CompletePosition): boolean {
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
