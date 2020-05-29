import keyboardjs from 'keyboardjs';

export enum Keybinds {
  Left,
  Right,
  A,
  D,
}

class InputHandler {
  private keybindActions: { [key: string]: Function } = {};

  constructor() {
    keyboardjs.bind('left', e => this.onKeyEvent(e, Keybinds.Left));
    keyboardjs.bind('right', e => this.onKeyEvent(e, Keybinds.Right));
    keyboardjs.bind('a', e => this.onKeyEvent(e, Keybinds.A));
    keyboardjs.bind('d', e => this.onKeyEvent(e, Keybinds.D));
  }

  public registerKeybindAction(keybind: Keybinds | Keybinds[], callback: Function): void {
    if (!keybind) {
      return;
    }

    if (Array.isArray(keybind)) {
      keybind.forEach(k => {
        this.keybindActions[k.toString()] = callback;
      });
    } else {
      this.keybindActions[keybind.toString()] = callback;
    }
  }

  private onKeyEvent(event: keyboardJS.KeyEvent | undefined, keybind: Keybinds) {
    if (!event) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this.throttleKeyboard();

    if (this.keybindActions[keybind.toString()]) {
      this.keybindActions[keybind.toString()]();
    }
  }

  private throttleKeyboard(): void {
    keyboardjs.pause();
    setTimeout(() => keyboardjs.resume(), 20);
  }
}

export default InputHandler;
