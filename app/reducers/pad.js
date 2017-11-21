// @flow
import { ActionType, PadPosition, PadData } from '../models';

import { SPAWN_PAD } from '../actions/gameState';
import { LEFT, RIGHT } from '../actions/inputHandler';

import { PadSpawnerFactory, PadService } from '../services/index';

type PadStateType = {
  position?: PadPosition,
  width?: number,
  padding?: number,
  top?: number
};

const initialState: PadStateType = {
    position: undefined,
    width: undefined,
    padding: undefined,
    top: undefined
}

export default function pad(state: PadStateType = initialState, action: ActionType) {
    let newState = Object.assign({}, state);
    switch (action.type)
    {
        case SPAWN_PAD:
            const pad: Pad = PadSpawnerFactory.SpawnPad(action.parameter.config, action.parameter.gameConfiguration);
            const padData: PadData = pad.PadData;

            PadService.OnSpawnPad(pad);

            newState.position = padData.position;
            newState.width = padData.width;
            newState.padding = padData.padding;
            newState.top = padData.top;
            return newState;

        case LEFT:
            newState.position = PadService.MoveLeft();
            return newState;

        case RIGHT:
            newState.position = PadService.MoveRight();
            return newState;

        default:
            return state;
    }
}