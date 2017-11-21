import { BulletService } from './BulletService';
import { GameConfiguration } from '../models/GameConfiguration';

class __TickService {
    constructor() {
        this.isRunning = false;
        this.nextBulletSpawn = 0;
    }

    SetGameConfiguration(config: GameConfiguration) {
        this.gameConfiguration = config;
    }

    LoadActions(actions) {
        this.isRunning = false;
        this.actions = actions;
    }

    Pause() {
        this.isRunning = false;
    }

    Unpause() {
        this.isRunning = true;
    }

    Run() {
        this.tickIntervalId = setInterval(() => this.tick(), this.gameConfiguration.Tick);
        this.isRunning = true;
    }

    tick() {
        if (this.isRunning) {
            if (this.nextBulletSpawn <= 0) {
                BulletService.SpawnBullet(this.actions.SpawnBullet, this.gameConfiguration);
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