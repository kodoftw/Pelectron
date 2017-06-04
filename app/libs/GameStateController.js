import { bindActionCreators } from 'redux';
import * as GameStateActions from '../actions/gameState';

class __GameStateController {
    constructor() {
        this.bulletColors = ['FF0000', 'FFFF00', '00FF00', '00FFFF', '0000FF', 'FF00FF'];
        this.nextColor = 0;
    }

    startGame(dispatch) {
        const { SpawnBullet } = this.getActions(dispatch);

        setInterval(() => this.spawnBullet(SpawnBullet), 2000);
    }

    spawnBullet(SpawnBullet) {
        if (typeof SpawnBullet === 'function') {
            let actionParameter = {
                color: this.bulletColors[this.nextColor]
            }
            SpawnBullet(actionParameter);
            this.nextColor = (this.nextColor + 1) % (this.bulletColors.length);
        }
    }

    getActions(dispatch) {
        return bindActionCreators(GameStateActions, dispatch);
    }
}

export let GameStateController = new __GameStateController();