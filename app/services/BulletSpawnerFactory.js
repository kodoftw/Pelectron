import { Bullet } from '../entities/index.js';

import { BulletData, GameConfiguration } from '../models/index.js';

export const BulletSpawnerFactory = {
    SpawnBullet(config, gameConfiguration: GameConfiguration): Bullet {
        let bullet = Object.create(BulletData, this.BulletFactory());

        Object.keys(config).forEach((_) => {
            bullet[_] = config[_];
        });

        return new Bullet(bullet, gameConfiguration);
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
