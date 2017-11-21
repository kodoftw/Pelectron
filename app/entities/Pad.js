import { Bullet } from "../entities/index";
import { PadPosition, PadData } from "../models/index";

export class Pad {
    constructor(padData: PadData, gameConfiguration: gameConfiguration) {
        this._PadData = padData;
    }

    // Moves the pad one position to the left.
    // Does not move if already at left.
    // @returns: The new PadPosition value
    MoveLeft(): PadPosition {
        const curPosition: PadPosition = this._PadData.position;
        if (curPosition == null || curPosition === PadPosition.LEFT) {
            return curPosition;
        } else if (curPosition == PadPosition.CENTER) {
            return PadPosition.LEFT;
        } else {
            return PadPosition.CENTER;
        }
    }

    // Moves the pad one position to the right.
    // Does not move if already at right.
    // @returns: The new PadPosition value
    MoveRight() {
        const curPosition: PadPosition = this._PadData.position;
        if (curPosition == null || curPosition === PadPosition.RIGHT) {
            return curPosition;
        } else if (curPosition === PadPosition.CENTER) {
            return PadPosition.RIGHT;
        } else {
            return PadPosition.CENTER;
        }
    }

    get Left(): number {
        const curPosition: PadPosition = this._PadData.position;
        if (curPosition == null) {
            return null;
        } else if (curPosition === PadPosition.LEFT) {
            return this._PadData.padding;
        } else if (curPosition === PadPosition.CENTER) {
            return this._PadData.padding + this._PadData.width;
        } else {
            return this._PadData.padding + 2 * this._PadData.width;
        }
    }

    get Right(): number {
        const curPosition: PadPosition = this._PadData.position;
        if (curPosition == null) {
            return null;
        } else if (curPosition === PadPosition.LEFT) {
            return this._PadData.padding + this._PadData.width;
        } else if (curPosition === PadPosition.CENTER) {
            return this._PadData.padding + 2 * this._PadData.width;
        } else {
            return this._PadData.padding + 3 * this._PadData.width;
        }
    }

    get Top(): number {
        return this._PadData.top;
    }

    get PadData(): PadData {
        return this._PadData;
    }
}
