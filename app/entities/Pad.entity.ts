import { PadData, PadPosition } from '../models/Pad';

export default class PadEntity {
  private numPadPositions = Object.values(PadPosition).length / 2;
  constructor(private padData: PadData) {}

  MoveLeft(): void {
    this.padData.Position = Math.max(this.padData.Position - 1, 0);
  }

  MoveRight(): void {
    this.padData.Position = Math.min(this.padData.Position + 1, this.numPadPositions - 1);
  }

  get Left(): number {
    const curPosition: PadPosition = this.padData.Position;
    if (curPosition === PadPosition.Left) {
      return this.padData.Padding;
    }

    if (curPosition === PadPosition.Center) {
      return this.padData.Padding + this.padData.Width;
    }

    return this.padData.Padding + 2 * this.padData.Width;
  }

  get Right(): number {
    const curPosition: PadPosition = this.padData.Position;
    if (curPosition === PadPosition.Left) {
      return this.padData.Padding + this.padData.Width;
    }

    if (curPosition === PadPosition.Center) {
      return this.padData.Padding + 2 * this.padData.Width;
    }

    return this.padData.Padding + 3 * this.padData.Width;
  }

  get Top(): number {
    return this.padData.Top;
  }

  get PadData(): PadData {
    return this.padData;
  }

  get Position(): PadPosition {
    return this.padData.Position;
  }
}
