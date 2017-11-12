import { Bullet } from '../entities/index.js';

import { BulletData } from '../models/index.js';

export const BulletSpawnerFactory = {
    SpawnBullet(config): Bullet {
        let bullet = Object.create(BulletData, this.BulletFactory());

        Object.keys(config).forEach((_) => {
            bullet[_] = config[_];
        });

        return new Bullet(bullet);
    },
    BulletFactory: () => {
        return {
            position: {
                value: {
                    x: 0,
                    y: 0
                }
            },
            velocity: {
                value: {
                    x: 0,
                    y: 0
                }
            }
        };
    }
}
