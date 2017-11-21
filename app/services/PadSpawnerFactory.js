import { Pad, PadPosition } from "../entities/index";

import { PadData, GameConfiguration } from "../models/index";

export const PadSpawnerFactory = {
    SpawnPad(config, gameConfiguration: GameConfiguration): Pad {
        let padData = Object.create(PadData, this.PadDataFactory(gameConfiguration));

        if (config != null) {
            Object.keys(config).forEach((_) => {
                padData[_] = config[_];
            });
        }

        return new Pad(padData, gameConfiguration);
    },
    PadDataFactory: (gameConfiguration: GameConfiguration) => {
        return {
            position: {
                value: gameConfiguration.PadInitialPosition
            },
            width: {
                value: gameConfiguration.PadWidth
            },
            padding: {
                value: gameConfiguration.PadPadding
            },
            top: {
                value: gameConfiguration.PadTop
            }
        }
    }
}
