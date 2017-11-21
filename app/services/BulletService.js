import { GameConfiguration } from "../models/index";

class __BulletService {
    constructor() {
        this.bulletCounter = 0;
        this.bulletColors = this.getBulletColors();
        this.nextColor = 0;
    }

    SpawnBullet(SpawnBullet: Function, gameConfiguration: GameConfiguration) {
        let actionParameter = {
            config: {
                color: this.bulletColors[this.nextColor],
                id: this.bulletCounter++
            },
            gameConfiguration: gameConfiguration
        }
        SpawnBullet(actionParameter);
        this.nextColor = (this.nextColor + 1) % (this.bulletColors.length);
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

export const BulletService = new __BulletService();