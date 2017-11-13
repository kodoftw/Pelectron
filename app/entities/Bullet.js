import { BulletData, GameConfiguration } from "../models/index";

export class Bullet {

    constructor(bulletData: BulletData, gameConfiguration: GameConfiguration) {
        this.bulletData = bulletData;
        this.PadTop = gameConfiguration.PadTop;
        this.padHorizontalCenterArray = [
            gameConfiguration.PadPadding + 0.5 * gameConfiguration.PadWidth - 0.5 * gameConfiguration.BulletSize,
            gameConfiguration.PadPadding + 1.5 * gameConfiguration.PadWidth - 0.5 * gameConfiguration.BulletSize,
            gameConfiguration.PadPadding + 2.5 * gameConfiguration.PadWidth - 0.5 * gameConfiguration.BulletSize
        ];
        this.maxTick = gameConfiguration.BulletDropTime / gameConfiguration.Tick;
        this.yAcc = 2 * (gameConfiguration.PadTop - gameConfiguration.BulletSize) / (this.maxTick * this.maxTick);
        this.UpdateBulletHorizontalVelocity();
    }

    move() {
        const oldPosition = this.bulletData.position.y;

        this.bulletData.position.y += this.bulletData.velocity.y + this.yAcc / 2;
        this.bulletData.position.x += this.bulletData.velocity.x;

        this.bulletData.velocity.y += this.yAcc;

        // @TODO: Check for collisions
        if (this.bulletData.position.y >= this.PadTop) {
            this.bulletData.velocity.y *= -1;
            this.UpdateBulletHorizontalVelocity();
        }
    }

    UpdateBulletHorizontalVelocity() {
        if (typeof this.padIndex === "undefined") {
            this.padIndex = 0;
        } else {
            this.padIndex = (this.padIndex + 1) % this.padHorizontalCenterArray.length;
        }

        if (this.padIndex === 0) {
            this.bulletData.velocity.x = this.padHorizontalCenterArray[0] / this.maxTick;
        } else {
            let distance = this.padHorizontalCenterArray[this.padIndex] - this.padHorizontalCenterArray[this.padIndex - 1];
            this.bulletData.velocity.x = 0.5 * distance / this.maxTick;
        }
    }

    get state(): BulletData {
        return this.bulletData;
    }
}