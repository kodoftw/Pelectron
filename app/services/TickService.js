import { BulletService } from './BulletService';
import { GameConfiguration } from '../models/GameConfiguration';

class __TickService {
    constructor() {
        this.isRunning = false;
        this.nextBulletSpawn = 0;
    }

    setGameConfiguration(config: GameConfiguration) {
        this.gameConfiguration = config;
    }

    loadActions(actions) {
        this.isRunning = false;
        this.actions = actions;
    }

    pause() {
        this.isRunning = false;
    }

    unpause() {
        this.isRunning = true;
    }

    run() {
        this.tickIntervalId = setInterval(() => this.tick(), this.gameConfiguration.Tick);
        this.isRunning = true;
    }

    tick() {
        if (this.isRunning) {
            if (this.nextBulletSpawn <= 0) {
                BulletService.spawnBullet(this.actions.SpawnBullet, this.gameConfiguration);
                this.nextBulletSpawn = this.gameConfiguration.BulletSpawnRate;
            } else {
                this.nextBulletSpawn -= this.gameConfiguration.Tick;
            }

            this.dispatchGameTick();
        }
    }

    dispatchGameTick() {
        this.actions.GameTick();
    }
}

export const TickService = new __TickService();