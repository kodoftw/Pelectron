import { Bullet } from '../entities/index.js';

export const BulletSpawnerFactory = {
    SpawnBullet(config): Bullet {
        let bullet = Object.create(this.BulletFactory);

        Object.keys(config).forEach((_) => {
            bullet[_] = config[_];
        });

        return new Bullet(bullet);
    },
    BulletFactory: {
        position: {
            x: 0,
            y: 0
        },
        velocity: {
            x: 0,
            y: 0
        }
    }
}
