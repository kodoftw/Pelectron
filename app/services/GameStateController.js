import { bindActionCreators } from 'redux';
import * as GameStateActions from '../actions/gameState';

import { TickService, PadService } from './index';
import { PadPosition, GameConfiguration } from '../models/index';

class __GameStateController {
    constructor() {
    }

    StartGame(dispatch) {
        let actions = this.getActions(dispatch);

        let gameConfiguration = this.gameConfigurationOnStart;

        this.CreatePad(actions, gameConfiguration);
        this.StartTickService(dispatch, actions, gameConfiguration)
    }

    CreatePad(actions, gameConfiguration) {
        PadService.SpawnPad(actions.SpawnPad, gameConfiguration);
    }

    StartTickService(dispatch, actions, gameConfiguration) {
        TickService.SetGameConfiguration(gameConfiguration);
        TickService.LoadActions(actions);
        TickService.Run(dispatch);
    }

    getActions(dispatch) {
        return bindActionCreators(GameStateActions, dispatch);
    }

    get gameConfigurationOnStart() : GameConfiguration {
        return Object.create(GameConfiguration, {
            BulletDropTime: { value: 3000 },
            BulletSpawnRate: { value: 3000 },
            BulletSize: { value: 1.3 },
            PadInitialPosition: { value: PadPosition.CENTER },
            PadPadding: { value: 3.5 },
            PadWidth: { value: 31 },
            PadTop: { value: 95 },
            Tick: { value: 1000 / 60 }
        });
    }
}

export let GameStateController = new __GameStateController();