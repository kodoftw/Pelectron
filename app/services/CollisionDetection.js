import { Bullet } from "../entities/index";
import { PadService } from "./index";
import { BulletPosition } from "../models/index";

export const CollisionDetection = {
    Check(bullet: Bullet, nextBulletPosition: BulletPosition): boolean {
        const pad = PadService.Pad;

        if (pad == null || bullet == null || nextBulletPosition == null) {
            return false;
        }

        // Do collision check
        return bullet.State.position.y <= pad.Top
            && nextBulletPosition.y >= pad.Top
            && nextBulletPosition.x >= pad.Left
            && nextBulletPosition.x <= pad.Right;
    }
}
