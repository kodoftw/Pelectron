import { BulletData, BulletPosition, GameConfiguration } from "../models/index";

export class Bullet {

    constructor(bulletData: BulletData, gameConfiguration: GameConfiguration) {
        this.bulletData = bulletData;
        this.BulletSize = gameConfiguration.BulletSize;
        this.PadTop = gameConfiguration.PadTop;
        this.CollisionThreshold = this.PadTop * 0.9;
        this.padHorizontalCenterArray = [
            gameConfiguration.PadPadding + 0.5 * gameConfiguration.PadWidth - 0.5 * gameConfiguration.BulletSize,
            gameConfiguration.PadPadding + 1.5 * gameConfiguration.PadWidth - 0.5 * gameConfiguration.BulletSize,
            gameConfiguration.PadPadding + 2.5 * gameConfiguration.PadWidth - 0.5 * gameConfiguration.BulletSize
        ];
        this.maxTick = gameConfiguration.BulletDropTime / gameConfiguration.Tick;
        this.yAcc = 2 * (gameConfiguration.PadTop - gameConfiguration.BulletSize) / (this.maxTick * this.maxTick);
        this.updateBulletHorizontalVelocity();
    }

    get State(): BulletData {
        return this.bulletData;
    }

    get LastPosition(): BulletPosition {
        return this.lastPosition;
    }

    // Gets the bullet's position in the next frame
    GetNextPosition(): BulletPosition {
        return {
            x: this.bulletData.position.x + this.tickHorizontalMovement,
            y: this.bulletData.position.y + this.tickVerticalMovement
        };
    }

    // Checks if a pad collision can occurr
    // @returns: Whether pad collision should be verified
    CanCollide(position: BulletPosition): boolean {
        return position.y > this.CollisionThreshold;
    }

    // Moves the bullet to the position received
    // Also updates the bullet's velocity by one frame
    Move(ratio: number = 1) {
        this.bulletData.position.x += this.tickHorizontalMovement * ratio;
        this.bulletData.position.y += this.tickVerticalMovement * ratio;

        this.bulletData.velocity.y += this.yAcc;
    }

    OnPadCollision(): number {
        const maxVerticalMovement = this.PadTop - (this.bulletData.position.y - this.BulletSize);
        const distanceRatio = maxVerticalMovement / this.tickVerticalMovement;

        this.bulletData.position.y += maxVerticalMovement;
        this.bulletData.position.x += this.tickHorizontalMovement * distanceRatio;

        this.updateBulletVelocity();

        return distanceRatio;
    }

    get tickHorizontalMovement(): number {
        return this.bulletData.velocity.x;
    }

    get tickVerticalMovement(): number {
        return this.bulletData.velocity.y + this.yAcc / 2;
    }

    updateBulletVelocity() {
        this.updateBulletHorizontalVelocity();
        this.updateBulletVerticalVelocity();
    }

    updateBulletVerticalVelocity() {
        this.bulletData.velocity.y *= -1;
    }

    updateBulletHorizontalVelocity() {
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
}