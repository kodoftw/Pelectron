import { bindActionCreators } from 'redux';
import * as GameStateActions from '../actions/gameState';

import { TickService } from './TickService';
import { GameConfiguration } from '../models/GameConfiguration';

class __GameStateController {
    constructor() {
    }

    startGame(dispatch) {
        let actions = this.getActions(dispatch);

        TickService.setGameConfiguration(this.gameConfigurationOnStart);
        TickService.loadActions(actions);
        TickService.run(dispatch);
    }

    getActions(dispatch) {
        return bindActionCreators(GameStateActions, dispatch);
    }

    get gameConfigurationOnStart() : GameConfiguration {
        return Object.create(GameConfiguration, {
            BulletDropTime: { value: 3000 },
            BulletSpawnRate: { value: 3000 },
            BulletSize: { value: 1.3 },
            PadPadding: { value: 3.5 },
            PadWidth: { value: 31 },
            PadTop: { value: 95 },
            Tick: { value: 1000 / 60 }
        });
    }
}

export let GameStateController = new __GameStateController();