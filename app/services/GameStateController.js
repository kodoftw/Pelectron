import { bindActionCreators } from 'redux';
import * as GameStateActions from '../actions/gameState';

class __GameStateController {
    constructor() {
        this.bulletCounter = 0;
        this.bulletColors = this.getBulletColors();
        this.nextColor = 0;
    }

    startGame(dispatch) {
        const { SpawnBullet } = this.getActions(dispatch);

        setInterval(() => this.spawnBullet(SpawnBullet), 2000);
    }

    spawnBullet(SpawnBullet) {
        if (typeof SpawnBullet === 'function') {
            let actionParameter = {
                color: this.bulletColors[this.nextColor],
                id: this.bulletCounter++
            }
            SpawnBullet(actionParameter);
            this.nextColor = (this.nextColor + 1) % (this.bulletColors.length);
        }
    }

    getActions(dispatch) {
        return bindActionCreators(GameStateActions, dispatch);
    }

    getBulletColors() {
        return [
            '#1E88E5', // blue
            '#F44336', // red
            '#43A047', // green
            '#3949AB', // indigo
            '#FB8C00', // orange
            '#5E35B1', // deeppurple
            '#6D4C41', // brown
            '#FDD835', // yellow
            '#880E4F', // deeppink
            '#039BE5'  // lightblue
        ];
    }
}

export let GameStateController = new __GameStateController();