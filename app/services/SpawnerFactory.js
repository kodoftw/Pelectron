import { Bullet } from '../models';

export const SpawnerFactory = {
    Bullet(config): Bullet {
        let bullet = Object.create(this.BulletFactory);

        Object.keys(config).forEach((_) => {
            bullet[_] = config[_];
        });

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
