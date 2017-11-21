import { Pad } from '../entities/index.js';

import { GameConfiguration, PadPosition } from '../models/index.js';

class __PadService {
    constructor() {
        this._PadInstance = undefined;
    }

    SpawnPad(SpawnPad: Function, gameConfiguration: GameConfiguration) {
        let actionParameter = {
            gameConfiguration: gameConfiguration
        }
        SpawnPad(actionParameter);
    }

    OnSpawnPad(pad: Pad) {
        this._PadInstance = pad;
    }

    // Calls Pad.MoveLeft()
    // @returns: Returns the function called return value.
    MoveLeft(): PadPosition {
        return this._PadInstance.MoveLeft();
    }

    // Calls Pad.MoveRight()
    // @returns: Returns the function called return value.
    MoveRight(): PadPosition {
        return this._PadInstance.MoveRight();
    }

    get Pad(): Pad {
        return this._PadInstance;
    }
}

export const PadService = new __PadService();