import keyboardjs from 'keyboardjs';
import { bindActionCreators } from 'redux';
import * as InputHandlerActions from '../actions/inputHandler';

class __InputHandler {
    constructor() {
    }

    LoadActions(dispatch) {
        const { Left, Right } = this.getActions(dispatch);

        // @TODO: unbind all actions
        keyboardjs.bind('left', (e) => this.onKeyEvent(e, Left));
        keyboardjs.bind('right', (e) => this.onKeyEvent(e, Right));
    }

    onKeyEvent(event, callback) {
        event.preventDefault();
        event.stopPropagation();
        this.throttleKeyboard();
        callback();
    }

    throttleKeyboard() {
        keyboardjs.pause();
        setTimeout(() => keyboardjs.resume(), 20);
    }

    getActions(dispatch) {
        return bindActionCreators(InputHandlerActions, dispatch);
    }
}

export let InputHandler = new __InputHandler();