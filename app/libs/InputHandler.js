import * as PadActions from '../actions/pad';
import keyboardjs from 'keyboardjs';

class __InputHandler {
    constructor() {
        const { MoveLeft, MoveRight } = PadActions;

        keyboardjs.bind('left', (e) => this.onKeyEvent(e, MoveLeft));
        keyboardjs.bind('right', (e) => this.onKeyEvent(e, MoveRight));
    }

    onKeyEvent(event, callback) {
        event.preventDefault();
        event.stopPropagation();
        this.throttleKeyboard();
        console.log(`${event.key} pressed`);
        callback();
    }

    throttleKeyboard() {
        keyboardjs.pause();
        setTimeout(() => keyboardjs.resume(), 20);
    }
}

export let InputHandler = new __InputHandler();