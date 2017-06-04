import { Bullet } from '../models';

export const SpawnerFactory = {
    Bullet(config): Bullet {
        let bullet = Object.create(this.BulletFactory);

        for (var prop in config) {
            if (config.hasOwnProperty(prop)) {
                bullet[prop] = config[prop];
            }
        }

        return bullet;
    },
    BulletFactory: {
        position: {
            x: 0,
            y: 0
        },
        color: undefined,
        velocity: {
            x: 0,
            y: 0
        }
    }
}