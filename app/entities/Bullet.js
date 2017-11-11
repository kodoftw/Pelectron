import { BulletData } from "../models/index";

export class Bullet {
    constructor(bulletData: BulletData) {
        this.bulletData = bulletData;
    }

    move(step: number) {
        this.bulletData.position.y += 0.05;
        this.bulletData.position.x += 0.05;
    }

    get state(): BulletData {
        return this.bulletData;
    }
}