import { Bullet } from '../entities/index.js';

import { BulletData, GameConfiguration } from '../models/index.js';

export const BulletSpawnerFactory = {
    SpawnBullet(config, gameConfiguration: GameConfiguration): Bullet {
        let bulletData = Object.create(BulletData, this.BulletDataFactory());

        if (config != null) {
            Object.keys(config).forEach((_) => {
                bulletData[_] = config[_];
            });
        }

        return new Bullet(bulletData, gameConfiguration);
    },
    BulletDataFactory: () => {
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
